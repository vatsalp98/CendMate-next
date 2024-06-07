import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      // if (!user) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "User not found in the database.",
      //   });
      // }

      // const isValidPass = await checkPassword(input.password, user.password);

      // if (!isValidPass) {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Invalid Email or Password, try again.",
      //   });
      // }

      const { data, error } = await ctx.supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),

  addressSignup: publicProcedure
    .input(
      z.object({
        address1: z.string(),
        address2: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postal: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authData = await ctx.supabase.auth.getUser();
      const user = authData.data.user;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login first",
        });
      }

      const db = await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          country: input.country,
          address: {
            create: {
              addressLine1: input.address1,
              addressLine2: input.address2,
              city: input.city,
              state: input.state,
              country: input.country,
              countryCode: input.country,
              postal: input.postal,
            },
          },
        },
      });

      return db;
    }),

  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        recoveryEmail: z.string().email(),
        dob: z.date(),
        phone: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase.auth.signUp({
        email: input.email,
        password: input.password,
        phone: input.phone,
      });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      // const hashedPass = await hashPassword(input.password);

      const dbResponse = await ctx.db.user.create({
        data: {
          uid: data.user!.id,
          email: input.email,
          dob: new Date(input.dob).toISOString(),
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          recoveryEmail: input.recoveryEmail,
          password: input.password,
          userName:
            input.firstName.substring(0, 3) + input.lastName.substring(0, 3),
          country: "",
        },
      });

      if (!dbResponse) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong creating the User in the DB",
        });
      }

      return data;
    }),
});
