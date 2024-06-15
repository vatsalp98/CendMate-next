import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import type { ComplyCheckCompleted } from "~/config/models";
import { ComplyCube, EventVerifier } from "@complycube/api";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.COMPLYCUBE_WEBHOOK_SECRET;
  const complyCube = new ComplyCube({ apiKey: env.COMPLYCUBE_KEY });
  const eventVerifier = new EventVerifier(WEBHOOK_SECRET);
  const payload = (await req.json()) as ComplyCheckCompleted;
  const payloadHeaders = headers();
  const signature = payloadHeaders.get("Complycube-Signature");

  if (!signature) {
    return new Response("Cannot validate Webhook signature", {
      status: 400,
    });
  }
  const event = eventVerifier.constructEvent(
    JSON.stringify(payload),
    signature,
  );

  if (!event) {
    return new Response("Cannot create Event from webhook", {
      status: 400,
    });
  }

  if (
    event.type === "check.completed" ||
    event.type === "check.completed.clear"
  ) {
    const userDb = await db.user.findUnique({
      where: {
        complyClientId: payload.payload.clientId,
      },
    });

    if (!userDb) {
      return new Response("Cannot find User from webhook", {
        status: 400,
      });
    }

    const clientUser = await complyCube.client.get(payload.payload.clientId);

    await clerkClient.users.updateUser(userDb.uid, {
      publicMetadata: {
        kycComplete: true,
        complyCubeId: clientUser.id,
        onboardingComplete: true,
        db_id: userDb.id,
        role: userDb.role,
      },
    });

    await db.user.update({
      where: {
        id: userDb.id,
      },
      data: {
        isVerified: true,
        isSubmitted: true,
      },
    });

    return new Response("KYC Webhook succesfull Ingested", { status: 200 });
  }

  if (event.type === "check.failed") {
    const userDb = await db.user.findUnique({
      where: {
        complyClientId: payload.payload.clientId,
      },
    });

    if (!userDb) {
      return new Response("Cannot find User from webhook", {
        status: 400,
      });
    }

    await clerkClient.users.updateUser(userDb.uid, {
      publicMetadata: {
        kycComplete: false,
        complyCubeId: userDb.complyClientId,
      },
    });

    return new Response("KYC Failure Webhook ingested", { status: 200 });
  }
}
