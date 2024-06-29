import { type DefaultSession } from "next-auth";
import type { User } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] &
  User & {
    address1: string;
    address2: string | null;
    city: string;
    country: string;
    state: string;
    postal: string;
  };

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
