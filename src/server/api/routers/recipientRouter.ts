import axios from "axios";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import { env } from "~/env";
import { beneficiaryResponseSchemaObject } from "~/config/models";

export const recipientRouter = createTRPCRouter({
  getBeneficiarySchemaForCurrencyCode: privateProcedure
    .input(
      z.object({
        currencyCode: z
          .string()
          .regex(
            /^[A-Z]{3}$/,
            "This field accepts valid 3 letter ISO-4217 country codes",
          ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await axios.get<beneficiaryResponseSchemaObject[]>(
        `${env.NIUM_URL}/api/v2/client/${env.NIUM_CLIENT_ID}/customer/${env.NIUM_CUSTOMER_HASH_ID}/currency/${input.currencyCode}/validationSchemas`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": `${env.NIUM_API_KEY}`,
          },
        },
      );
      // console.log(response.data);
      const localSchema = response.data.find(
        (item) =>
          item.$id ===
          `beneficiary.${input.currencyCode.toLocaleLowerCase()}.local.json`,
      );
      // console.log(localSchema);
      return { schema: localSchema, currency: input.currencyCode };
    }),
});
