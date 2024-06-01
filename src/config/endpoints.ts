import { env } from "~/env";

export const loginEndpoint = `${env.NEXT_PUBLIC_BASE_URL}/api/users/login`;
export const verifyEndpoint = `${env.NEXT_PUBLIC_BASE_URL}/api/users/verify`;
export const walletsEndpoint = `${env.NEXT_PUBLIC_BASE_URL}/api/wallets/profile`;
export const transactionsEnpoint = `${env.NEXT_PUBLIC_BASE_URL}/api/transactions/profile`;
