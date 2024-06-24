"use server";

import { newPasswordSchema } from "~/schemas";
import { db } from "~/server/db";
import bcyptjs from "bcryptjs";
import type { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return {
      error: "Missing token!",
    };
  }

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { password, confirm_password } = validatedFields.data;

  const existingToken = await db.passwordResetToken.findUnique({
    where: {
      token,
    },
  });

  if (!existingToken) {
    return {
      error: "Invalid token!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });

  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  const hashedPassword = await bcyptjs.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Password updated!",
  };
};
