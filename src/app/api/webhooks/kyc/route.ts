import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import type { ComplyCheckCompleted } from "~/config/models";
import { ComplyCube, EventVerifier } from "@complycube/api";

export async function POST(req: Request) {
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

    const check = await complyCube.check.get(event.payload.id);

    if (check.type === "document_check") {
      await db.user.update({
        where: {
          id: userDb.id,
        },
        data: {
          isVerified: true,
          isSubmitted: true,
          complyDocumentCheckId: check.id,
        },
      });

      return new Response("KYC Document Check ID succesfully Saved", {
        status: 200,
      });
    } else if (check.type === "identity_check") {
      await db.user.update({
        where: {
          id: userDb.id,
        },
        data: {
          isVerified: true,
          isSubmitted: true,
          complyIdentityCheckId: check.id,
        },
      });

      return new Response("KYC Identity Check ID succesfully Saved", {
        status: 200,
      });
    }
  }

  if (event.type === "check.failed") {
    await db.user.update({
      where: {
        complyClientId: payload.payload.clientId,
      },
      data: {
        isVerified: false,
        isSubmitted: false,
      },
    });

    return new Response("KYC Failure Webhook ingested", { status: 200 });
  }
}
