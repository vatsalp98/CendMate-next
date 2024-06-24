import { type DefaultSession } from "next-auth";
import type { User } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & User;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
