"use server";

import { type z } from "zod";
import { sendPasswordResetEmail } from "~/config/mail";
import { generatePasswordResetToken } from "~/config/tokens";
import { resetSchema } from "~/schemas";
import { db } from "~/server/db";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Email!",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return {
      error: "Email not found!",
    };
  }

  const passwordToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(passwordToken.email, passwordToken.token);

  return {
    success: "Reset password email sent!",
  };
};
