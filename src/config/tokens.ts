import { v4 as uuidv4 } from "uuid";
import { db } from "~/server/db";
import crypto from "crypto";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // Expires in 15mns
  const expires = new Date(new Date().getTime() + 60000 * 15);

  const existingToken = await db.twoFactorToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.verificationToken.findFirst({
    where: {
      email: email,
    },
  });

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verifcationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verifcationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.passwordResetToken.findFirst({
    where: {
      email,
    },
  });

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
