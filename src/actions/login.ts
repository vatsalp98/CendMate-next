"use server";

import { signIn } from "auth";
import { AuthError } from "next-auth";
import type { z } from "zod";
import { sendVerificationToken, sendTwoFactorEmail } from "~/config/mail";
import { DEFAULT_LOGIN_REDIRECT } from "~/config/routes";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "~/config/tokens";
import { loginSchema } from "~/schemas";
import { db } from "~/server/db";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser?.email || !existingUser.password) {
    return {
      error: "Email does not exist!",
    };
  }

  if (existingUser.isBanned) {
    return {
      error: "Please contact support, your account has been suspended.",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationToken(
      verificationToken.email,
      verificationToken.token,
    );
    return {
      success: "Confirmation email sent!",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await db.twoFactorToken.findFirst({
        where: {
          email: existingUser.email,
        },
      });
      if (!twoFactorToken) {
        return {
          error: "Invalid Code!",
        };
      }

      if (twoFactorToken.token !== code) {
        return {
          error: "Invalid Code!",
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return {
          error: "Code expired!",
        };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await db.twoFactorConfirmation.findUnique({
        where: {
          userId: existingUser.id,
        },
      });
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }

    throw error;
  }
};
