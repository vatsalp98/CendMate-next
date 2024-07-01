import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import axios from "axios";
import {
  type FincraApiResponse,
  type OperatorResponseModel,
} from "~/config/models";
import { formatCurrency, formatMoney, getTotalTransactions } from "~/lib/utils";

export const paymentRouter = createTRPCRouter({
  fetchProviders: privateProcedure
    .input(
      z.object({
        currency: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const apiUrl = `${env.FINCRA_URL}/checkout-core/data/mobile-money-operators?currency=${input.currency}`;

      const response = await axios.get<OperatorResponseModel>(apiUrl, {
        headers: {
          "api-key": env.FINCRA_API_KEY,
        },
      });

      return response.data;
    }),

  depositFincra: privateProcedure
    .input(
      z.object({
        amount: z.string(),
        wallet_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.id,
        },
        include: {
          wallets: true,
          limits: true,
          transactions: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found in DB",
        });
      }
      const wallet = user.wallets.find((item) => item.id === input.wallet_id);
      if (!wallet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet not found in user wallets.",
        });
      }

      const currencyLimit = user.limits.find(
        (item) => item.currency === wallet.currency,
      );
      if (!currencyLimit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User limits not found for ${wallet.currency}`,
        });
      }

      const amount = parseFloat(input.amount);

      const dailyTotal = getTotalTransactions(
        user.transactions,
        "daily",
        "pay-in",
      );
      const weeklyTotal = getTotalTransactions(
        user.transactions,
        "weekly",
        "pay-in",
      );
      const monthlyTotal = getTotalTransactions(
        user.transactions,
        "monthly",
        "pay-in",
      );

      if (amount > currencyLimit.deposit_daily - dailyTotal) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Sorry you have exceeded your daily deposit limits for this wallet. You have ${formatCurrency(wallet.currency, formatMoney(currencyLimit.deposit_daily - dailyTotal))} left.`,
        });
      } else if (amount > currencyLimit.deposit_weekly - weeklyTotal) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Sorry you have exceeded your weekly deposit limits for this wallet.You have ${formatCurrency(wallet.currency, formatMoney(currencyLimit.deposit_weekly - weeklyTotal))} left.`,
        });
      } else if (amount > currencyLimit.deposit_monthly - monthlyTotal) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Sorry you have exceeded your monthly deposit limits for this wallet.You have ${formatCurrency(wallet.currency, formatMoney(currencyLimit.deposit_monthly - monthlyTotal))} left.`,
        });
      }

      const requestBody = {
        amount: input.amount,
        currency: wallet.currency, // Set currency based on wallet
        customer: {
          name: `${user.firstName + " " + user.lastName}`, // You can customize this based on your user data
          email: `${user.email}`, // You can customize this based on your user data
        },
      };
      const headers = {
        "api-key": env.FINCRA_API_KEY,
        "x-pub-key": env.FINCRA_X_PUB_KEY,
      };

      const response = await axios.post<FincraApiResponse>(
        `${env.FINCRA_URL}/checkout/payments`,
        requestBody,
        {
          headers,
        },
      );

      if (!response.data.status) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Fincra transaction failed to be created.",
        });
      }

      const { link, payCode } = response.data.data;

      await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          transactions: {
            create: {
              amount: parseFloat(input.amount),
              currency: wallet.currency,
              referenceId: payCode,
              type: "pay-in",
              status: "SUBMITTED",
              comment: "Pay-in Initiated",
              fincraPayCode: payCode,
              fincraLink: link,
              walletId: wallet.id,
            },
          },
        },
      });

      return {
        link: link,
        payCode: payCode,
        amount: input.amount,
      };
    }),
});
