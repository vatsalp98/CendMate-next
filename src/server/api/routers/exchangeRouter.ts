import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import type { RatesToUSD } from "~/config/models";

export const exchangeRouter = createTRPCRouter({
  getExchangeRates: privateProcedure.query(async ({ ctx }) => {
    const rates = await ctx.db.exchangeRate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const ratesToUSD = rates.reduce<RatesToUSD>((acc, rate) => {
      acc[rate.currency] = {
        rate: rate.marketRate,
        timestamp: rate.updatedAt.toISOString(),
      };
      return acc;
    }, {});

    if (!ratesToUSD) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Exchange Rates not found in DB",
      });
    }

    return ratesToUSD;
  }),

  getExchangeRatesFromWalletId: privateProcedure
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

      if (!wallet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet not found",
        });
      }

      const rates = await ctx.db.exchangeRate.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      const walletRate = rates.find(
        (item) => item.currency === wallet.currency,
      );

      if (!walletRate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Exchange from Rate not found",
        });
      }

      return { rates: rates, fromRate: walletRate };
    }),

  createExchangeRate: privateProcedure
    .input(
      z.array(
        z.object({
          currency: z.string(),
          rate: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const rateData = input.map((item) => ({
        currency: item.currency,
        marketRate: parseFloat(item.rate),
      }));

      const rates = await ctx.db.exchangeRate.createMany({
        data: rateData,
      });

      return rates;
    }),
});
