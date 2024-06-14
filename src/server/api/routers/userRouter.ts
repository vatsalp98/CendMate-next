import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import axios from "axios";
import { env } from "~/env";
import type {
  MapleRadResponseModel,
  MapleRadUpgradeResponse,
} from "~/config/models";
import { TRPCError } from "@trpc/server";
import { ComplyCube } from "@complycube/api";
import { MapleRadFormatDate, getCountryCode } from "~/lib/utils";

export const userRouter = createTRPCRouter({
  getUserDb: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        uid: ctx.userId,
      },
    });

    return user;
  }),

  onBoardUser: privateProcedure
    .input(
      z.object({
        dob: z.date(),
        address1: z.string(),
        address2: z.string().optional(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postal: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const complycube = new ComplyCube({
        apiKey: env.COMPLYCUBE_KEY,
      });
      const countryCode = getCountryCode(input.country);
      const userDb = await ctx.db.user.findUnique({
        where: {
          uid: ctx.userId,
        },
      });

      if (!userDb) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found in DB",
        });
      }

      // Creating MapleRad Customer
      const response = await axios.post<MapleRadResponseModel>(
        `${env.MAPLERAD_URL}/v1/customers`,
        {
          first_name: userDb.firstName,
          last_name: userDb.lastName,
          email: userDb.email,
          country: countryCode,
        },
        {
          headers: {
            Authorization: `Bearer ${env.MAPLERAD_SK}`,
          },
        },
      );

      if (!response.data) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating maple rad customer.",
        });
      }

      const upgradeRequestBody = {
        dob: MapleRadFormatDate(input.dob),
        phone: {
          phone_country_code: "+0",
          phone_number: userDb.phone.substring(1),
        },
        address: {
          street: input.address1,
          city: input.city,
          state: input.state,
          country: countryCode,
          postal_code: input.postal,
        },
        customer_id: response.data.data.id,
        identification_number: userDb.complyClientId,
      };

      const upgradeRequest = await axios.patch<MapleRadUpgradeResponse>(
        `${env.MAPLERAD_URL}/v1/customers/upgrade/tier1`,
        upgradeRequestBody,
        {
          headers: {
            Authorization: `Bearer ${env.MAPLERAD_SK}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (!upgradeRequest.data.status) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error upgrading the customer in Maple Rad.",
        });
      }

      const complyAddress = await complycube.address.create(
        userDb.complyClientId,
        {
          type: "main",
          propertyNumber: input.address2 ?? " ",
          line: input.address1,
          city: input.city,
          state: input.state,
          postalCode: input.postal,
          country: countryCode,
        },
      );

      if (!complyAddress) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating ComplyCube Address for user.",
        });
      }

      const user = await ctx.db.user.update({
        where: {
          id: userDb.id,
        },
        data: {
          mapleRadCustomerId: response.data.data.id,
          country: countryCode,
          dob: new Date(input.dob).toISOString(),
          address: {
            create: {
              addressLine1: input.address1,
              addressLine2: input.address2,
              city: input.city,
              state: input.state,
              country: input.country,
              countryCode: countryCode,
              postal: input.postal,
            },
          },
        },
      });

      await clerkClient.users.updateUser(ctx.userId, {
        publicMetadata: {
          onboardingComplete: true,
          db_id: userDb.id,
          role: user.role,
        },
      });

      return user;
    }),
});
