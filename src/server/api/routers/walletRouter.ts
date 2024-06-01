import { walletsEndpoint } from "~/config/endpoints";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import type { Wallet } from "~/config/models";

export const walletRouter = createTRPCRouter({
  getWallets: publicProcedure.query(async () => {
    const walletsResponse = await fetch(walletsEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.TOKEN}`,
      },
    });

    const wallets = (await walletsResponse.json()) as Wallet[];

    return wallets;
  }),
});
