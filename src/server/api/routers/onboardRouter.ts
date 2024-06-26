/* eslint-disable @typescript-eslint/no-unsafe-return */
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { ComplyCube } from "@complycube/api";
import { env } from "~/env";
import type { ComplySession } from "~/config/models";

export const onboardRouter = createTRPCRouter({
  verifyKyc: privateProcedure.mutation(async ({ ctx }) => {
    const complyCube = new ComplyCube({ apiKey: env.COMPLYCUBE_KEY });
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found in DB.",
      });
    }

    const session = await complyCube.flow.createSession(user.complyClientId, {
      checkTypes: ["document_check", "identity_check"],
      successUrl: `${env.NEXT_PUBLIC_URL}/dashboard?new=true`,
      cancelUrl: `${env.NEXT_PUBLIC_URL}/dashboard`,
      theme: "light",
    });

    return session as unknown as ComplySession;
  }),
});
