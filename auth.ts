import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "auth.config";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/kyc",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isBanned) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique(
          {
            where: {
              userId: existingUser.id,
            },
          },
        );

        if (!twoFactorConfirmation) return false;

        // Delete 2fa Confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
        session.user.complyClientId = token.complyClientId as string;
        session.user.phone = token.phone as string;
        session.user.isTwoFactorEnabled = token.twoFactorEnabled as boolean;
        session.user.isVerified = token.kycComplete as boolean;
        session.user.isSubmitted = token.isSubmitted as boolean;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.dob = token.dob as string;
        session.user.avatar = token.avatar as string;
        session.user.notificationPreferences = token.notification as string;
        session.user.country = token.country as string;
        session.user.address1 = token.address1 as string;
        session.user.address2 = token.address2 as string;
        session.user.city = token.city as string;
        session.user.country = token.country as string;
        session.user.postal = token.postal as string;
        session.user.isBanned = token.isBanned as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
        include: {
          address: true,
        },
      });

      if (!existingUser) return token;

      const address = await db.address.findUnique({
        where: {
          userId: existingUser.id,
        },
      });

      if (!address) return token;

      token.role = existingUser.role;
      token.complyClientId = existingUser.complyClientId;
      token.phone = existingUser.phone;
      token.twoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.kycComplete = existingUser.isVerified;
      token.isSubmitted = existingUser.isSubmitted;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.dob = existingUser.dob;
      token.avatar = existingUser.avatar;
      token.notification = existingUser.notificationPreferences;
      token.country = existingUser.country;
      token.address1 = address.addressLine1;
      token.address2 = address.addressLine2 ?? "";
      token.city = address.city;
      token.country = address.country;
      token.state = address.state;
      token.postal = address.postal;
      token.isBanned = existingUser.isBanned;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
