import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { onboardRouter } from "./routers/onboardRouter";
import { walletRouter } from "./routers/walletRouter";
import { transactionRouters } from "./routers/transactionRouter";
import { userRouter } from "./routers/userRouter";
import { paymentRouter } from "./routers/paymentRouter";
import { exchangeRouter } from "./routers/exchangeRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  onboard: onboardRouter,
  wallet: walletRouter,
  transactions: transactionRouters,
  user: userRouter,
  payment: paymentRouter,
  exchange: exchangeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
