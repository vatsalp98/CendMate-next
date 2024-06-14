import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const exchangeRouter = createTRPCRouter({
  getExchangeRates: privateProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const rates = await ctx.db.exchangeRate.findMany({
      where: {
        createdAt: now,
      },
    });

    return rates;
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
