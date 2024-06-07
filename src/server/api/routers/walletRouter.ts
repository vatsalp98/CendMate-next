import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getCurrencyLimits } from "~/config/defaultLimits";

export const walletRouter = createTRPCRouter({
  getWallets: privateProcedure.query(async ({ ctx }) => {
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

    const wallets = await ctx.db.wallet.findMany({
      where: {
        ownerId: user.id,
      },
    });

    return wallets;
  }),

  getWalletById: privateProcedure
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

      if (!wallet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet not found in DB.",
        });
      }

      const limits = await ctx.db.limit.findMany({
        where: {
          userId: user?.id,
        },
      });

      const limit = limits.find((item) => item.currency === wallet.currency);

      return { wallet: wallet, limit: limit };
    }),

  createWallet: privateProcedure
    .input(
      z.object({
        currency: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const limits = getCurrencyLimits(input.currency);
      const user = await ctx.db.user.update({
        where: {
          uid: ctx.user.id,
        },
        data: {
          wallets: {
            create: {
              currency: input.currency,
            },
          },
          limits: {
            create: {
              currency: input.currency,
              deposit_daily: limits.dailyDeposit,
              deposit_weekly: limits.weeklyDeposit,
              deposit_monthly: limits.monthlyDeposit,
              withdraw_daily: limits.dailyWithdrawal,
              withdraw_weekly: limits.weeklyWithdrawal,
              withdraw_monthly: limits.monthlyWithdrawal,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found in DB",
        });
      }

      return user;
    }),
});
