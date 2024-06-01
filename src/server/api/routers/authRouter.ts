import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { loginEndpoint, verifyEndpoint } from "~/config/endpoints";
import type { User } from "~/config/models";

interface OtpObject {
  userId: string;
  status: string;
}

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });

      console.log("response", response);

      const user = (await response.json()) as OtpObject;

      return user;
    }),

  verify: publicProcedure
    .input(
      z.object({
        otp: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const res = await fetch(verifyEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: input.otp,
          userId: input.userId,
        }),
      });

      const user = (await res.json()) as User;

      if (!user) {
        throw new Error("User not found.");
      }

      return user;
    }),
});
