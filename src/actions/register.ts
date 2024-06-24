"use server";

import { ComplyCube } from "@complycube/api";
import type { z } from "zod";
import { env } from "~/env";
import { registerSchema } from "~/schemas";
import bcryptjs from "bcryptjs";
import { db } from "~/server/db";
import { generateVerificationToken } from "~/config/tokens";
import { sendVerificationToken } from "~/config/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  const complyCube = new ComplyCube({ apiKey: env.COMPLYCUBE_KEY });

  if (!validatedFields.success) {
    return {
      error: "Invalid rate!",
    };
  }

  const {
    email,
    password,
    phone,
    firstName,
    lastName,
    dob,
    address1,
    address2,
    city,
    country,
    state,
    postal_code,
  } = validatedFields.data;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user)
    return {
      error: "Email already in use!",
    };

  const complyClient = await complyCube.client.create({
    type: "person",
    email: email,
    mobile: phone,
    personDetails: {
      firstName: firstName,
      lastName: lastName,
    },
  });

  const hashedPassword = await bcryptjs.hash(password, 10);
  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      dob: dob.toISOString(),
      complyClientId: complyClient.id,
      password: hashedPassword,
      phone,
      address: {
        create: {
          addressLine1: address1,
          addressLine2: address2,
          city: city,
          country: country,
          countryCode: country,
          postal: postal_code,
          state: state,
        },
      },
      userName: firstName.substring(0, 3) + lastName.substring(0, 3),
    },
  });

  const verificationToken = await generateVerificationToken(email);

  // Send Verification Link to USER EMAIL
  await sendVerificationToken(verificationToken.email, verificationToken.token);

  return {
    success: "Confirmation email sent!",
  };
};
