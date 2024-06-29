import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { generateUniqueId } from "~/lib/utils";

export const transactionRouters = createTRPCRouter({
  getAllTransactions: privateProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      include: {
        wallet: true,
        sender: true,
      },
    });

    return transactions;
  }),

  getTransactions: privateProcedure
    .input(
      z.object({
        wallet_id: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No user found in DB",
        });
      }

      const transactions = await ctx.db.transaction.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          senderId: user.id,
          walletId: input.wallet_id,
        },
        include: {
          sender: true,
        },
      });

      return transactions;
    }),

  getTransactionById: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const transaction = await ctx.db.transaction.findUnique({
        where: {
          id: input.id,
        },
        include: {
          wallet: true,
          sender: true,
        },
      });

      if (!transaction) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transaction details not found.",
        });
      }

      return transaction;
    }),

  createTransferTransaction: privateProcedure
    .input(
      z.object({
        from_currency: z.string(),
        to_currency: z.string(),
        from_amount: z.number(),
        to_amount: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.id,
        },
        include: {
          wallets: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found in db",
        });
      }

      const fromWallet = user.wallets.find(
        (item) => item.currency === input.from_currency,
      );
      const toWallet = user.wallets.find(
        (item) => item.currency === input.to_currency,
      );

      if (!fromWallet || !toWallet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "From or to Wallet not found in DB",
        });
      }

      if (fromWallet.amount < input.from_amount) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Not enough funds in your wallet.",
        });
      }

      const uid = generateUniqueId();

      await ctx.db.transaction.create({
        data: {
          amount: input.to_amount,
          currency: input.to_currency,
          type: "transfer",
          status: "SUCCESS",
          referenceId: uid,
          comment: `Transfer from ${input.from_currency} to ${input.to_currency}`,
          walletId: toWallet.id,
          senderId: user.id,
        },
      });

      await ctx.db.wallet.update({
        where: {
          id: fromWallet.id,
        },
        data: {
          amount: {
            decrement: input.from_amount,
          },
        },
      });

      await ctx.db.wallet.update({
        where: {
          id: toWallet.id,
        },
        data: {
          amount: {
            increment: input.to_amount,
          },
        },
      });

      return user;
    }),

  getTransactionsByWallet: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const wallet = await ctx.db.wallet.findUnique({
        where: {
          id: input.id,
        },
      });

      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.id,
        },
      });

      if (!wallet || !user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet or User not found in DB",
        });
      }

      const transactions = await ctx.db.transaction.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          currency: wallet.currency,
          senderId: user.id,
        },
        include: {
          sender: true,
        },
      });

      return transactions;
    }),
});
