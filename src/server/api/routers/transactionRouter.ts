import { transactionsEnpoint } from "~/config/endpoints";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import type { Transactions } from "~/config/models";

export const transactionRouters = createTRPCRouter({
  getTransactions: publicProcedure.query(async () => {
    const response = await fetch(transactionsEnpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.TOKEN}`,
      },
    });

    const transactions = (await response.json()) as Transactions[];

    return transactions;
  }),
});
