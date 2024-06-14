import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const transactionRouters = createTRPCRouter({
  getTransactions: privateProcedure
    .input(
      z.object({
        wallet_id: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          uid: ctx.userId,
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
          uid: ctx.userId,
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
