import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const transactionRouters = createTRPCRouter({
  getTransactions: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        uid: ctx.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No user found in DB",
      });
    }

    const transactions = await ctx.db.transaction.findMany({
      where: {
        senderId: user.id,
      },
      include: {
        sender: true,
      },
    });

    return transactions;
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
          uid: ctx.user.id,
        },
      });

      if (!wallet || !user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet or User not found in DB",
        });
      }

      const transactions = await ctx.db.transaction.findMany({
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
