import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  getWalletBalances: privateProcedure.query(async ({ ctx }) => {
    const wallets = await ctx.db.wallet.findMany();

    const ghsTotal = wallets
      .filter((item) => item.currency === "GHS")
      .reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);

    const kesTotal = wallets
      .filter((item) => item.currency === "KES")
      .reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);

    const cadTotal = wallets
      .filter((item) => item.currency === "CAD")
      .reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);

    const usdTotal = wallets
      .filter((item) => item.currency === "USD")
      .reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);

    const eurTotal = wallets
      .filter((item) => item.currency === "EUR")
      .reduce((accumulator, currentObject) => {
        return accumulator + currentObject.amount;
      }, 0);

    return [
      { currency: "GHS", total: ghsTotal },
      { currency: "KES", total: kesTotal },
      { currency: "CAD", total: cadTotal },
      { currency: "USD", total: usdTotal },
      { currency: "EUR", total: eurTotal },
    ];
  }),

  banUser: privateProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          isBanned: input.status,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while banning customer.",
        });
      }
      return user;
    }),

  changeUserRole: privateProcedure
    .input(
      z.object({
        role: z.enum(["ADMIN", "USER", "SUPPORT"]),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while updating user role.",
        });
      }

      return user;
    }),
});
