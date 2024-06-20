import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { env } from "~/env";
import axios from "axios";
import {
  type FincraPayoutResponse,
  type OperatorResponseModel,
} from "~/config/models";
import { TRPCError } from "@trpc/server";
import { generateUniqueId } from "~/lib/utils";

export const withdrawalRouter = createTRPCRouter({
  fetchProviders: privateProcedure
    .input(
      z.object({
        currency: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const apiUrl = `${env.FINCRA_URL}/checkout-core/data/mobile-money-operators?currency=${input.currency}`;

      const response = await axios.get<OperatorResponseModel>(apiUrl, {
        headers: {
          "api-key": env.FINCRA_API_KEY,
        },
      });

      if (!response.data.status) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching phone providers",
        });
      }

      return response.data.data;
    }),

  initiateWithdrawal: privateProcedure
    .input(
      z.object({
        currency: z.string(),
        amount: z.string(),
        phoneNumber: z.string(),
        operator: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          uid: ctx.userId,
        },
        include: {
          wallets: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found in DB",
        });
      }

      const sourceWallet = user.wallets.find(
        (item) => item.currency === input.currency,
      );

      if (!sourceWallet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet not linked to the user in DB",
        });
      }
      const sourceCurrency = sourceWallet.currency;
      const customerReference = generateUniqueId();
      const description = "Payment";
      const destinationCurrency = sourceWallet.currency;
      const amount = parseFloat(input.amount);

      const beneficiary = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: "individual",
        accountHolderName: `${user.firstName} ${user.lastName}`,
        accountNumber: input.phoneNumber,
        mobileMoneyCode: input.operator,
        country: sourceWallet.currency === "GHS" ? "GH" : "KE",
      };
      const paymentDestination = "mobile_money_wallet";
      const business = env.FINCRA_BUSINESS_ID;

      const requestBody = {
        sourceCurrency,
        destinationCurrency,
        amount,
        description,
        customerReference,
        beneficiary,
        paymentDestination,
        business,
      };

      const response = await axios.post<FincraPayoutResponse>(
        `${env.FINCRA_URL}/disbursements/payouts`,
        requestBody,
        {
          headers: {
            "api-key": env.FINCRA_API_KEY,
          },
        },
      );

      if (!response.data.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error processing Fincra payout.",
        });
      }

      const data = response.data;

      const transaction = await ctx.db.transaction.create({
        data: {
          senderId: user.id,
          walletId: sourceWallet.id,
          amount: amount,
          currency: sourceWallet.currency,
          type: "pay-out",
          status: data.data.status === "processing" ? "SUBMITTED" : "FAILED",
          comment: "Pay-out initiation",
          fincraPayCode: customerReference,
          fincraChargeReference: data.data.reference,
          referenceId: customerReference,
          amountToSettle: amount,
          fincraPhone: input.phoneNumber,
          fincraPhoneOperator: input.operator,
        },
      });

      return transaction;
    }),
});
