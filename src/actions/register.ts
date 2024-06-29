"use server";

import { ComplyCube } from "@complycube/api";
import type { z } from "zod";
import { env } from "~/env";
import { registerSchema } from "~/schemas";
import bcryptjs from "bcryptjs";
import { db } from "~/server/db";
import { generateVerificationToken } from "~/config/tokens";
import { sendVerificationToken } from "~/config/mail";
import axios from "axios";
import type {
  MapleRadResponseModel,
  MapleRadUpgradeResponse,
} from "~/config/models";
import { MapleRadFormatDate } from "~/lib/utils";

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

  const response = await axios.post<MapleRadResponseModel>(
    `${env.MAPLERAD_URL}/v1/customers`,
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      country: country,
    },
    {
      headers: {
        Authorization: `Bearer ${env.MAPLERAD_SK}`,
      },
    },
  );

  const upgradeRequestBody = {
    dob: MapleRadFormatDate(dob),
    phone: {
      phone_country_code: "+0",
      phone_number: phone.substring(1),
    },
    address: {
      street: address1,
      city: city,
      state: state,
      country: country,
      postal_code: postal_code,
    },
    customer_id: response.data.data.id,
    identification_number: complyClient.id,
  };

  const upgradeRequest = await axios.patch<MapleRadUpgradeResponse>(
    `${env.MAPLERAD_URL}/v1/customers/upgrade/tier1`,
    upgradeRequestBody,
    {
      headers: {
        Authorization: `Bearer ${env.MAPLERAD_SK}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (!upgradeRequest) {
    return {
      error: "Maple Rad customer creation error!",
    };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      dob: dob.toISOString(),
      complyClientId: complyClient.id,
      password: hashedPassword,
      mapleRadCustomerId: response.data.data.id,
      phone,
      country,
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
