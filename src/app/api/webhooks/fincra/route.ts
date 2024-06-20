import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import type { FincraChargeEvent } from "~/config/models";
import crypto from "crypto";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.FINCRA_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Fincra Dashboard to .env or .env.local",
    );
  }
  const payload = (await req.json()) as FincraChargeEvent;

  const encryptedData = crypto
    .createHmac("SHA512", WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest("hex");

  // Get the headers
  const headerPayload = headers();
  const signature = headerPayload.get("signature");

  // If there are no headers, error out
  if (encryptedData != signature) {
    return new Response("Cannot validate Webhook signature", {
      status: 400,
    });
  }

  const { event, data } = payload;

  if (event === "charge.successful") {
    const transaction = await db.transaction.findUnique({
      where: {
        referenceId: data.reference,
      },
      include: {
        wallet: true,
      },
    });

    if (!transaction) {
      return new Response("Transaction not found.", {
        status: 404,
      });
    }

    if (data.amountToSettle === transaction.amount) {
      await db.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          comment: "pay-in completed",
          status: "SUCCESS",
          fincraChargeReference: data.chargeReference,
          fincraPhone: data.metadata.phone,
          fincraPhoneOperator: data.metadata.operator,
          wallet: {
            update: {
              amount: {
                increment: data.amountToSettle,
              },
            },
          },
        },
      });

      return new Response("Fincra webhook received and processed", {
        status: 200,
      });
    } else {
      return new Response("Invalid amount to settle.", {
        status: 400,
      });
    }
  } else if (event === "charge.failed") {
    await db.transaction.update({
      where: {
        referenceId: data.reference,
      },
      data: {
        status: "FAILED",
        comment: "pay-in failure, failed charge webhook received.",
      },
    });

    return new Response("Fincra webhook received and processed", {
      status: 200,
    });
  } else if (event === "payout.successful") {
    if (!data.customerReference || !data.amountCharged) {
      return new Response("Transaction Reference not found.", {
        status: 404,
      });
    }
    const transaction = await db.transaction.findUnique({
      where: {
        referenceId: data.customerReference,
      },
    });
    if (!transaction) {
      return new Response("Transaction not found.", {
        status: 404,
      });
    }

    if (
      data.status === "successful" &&
      data.amountReceived === transaction.amount
    ) {
      await db.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: "SUCCESS",
          comment: "Disbursement was succesfull",
          amountToSettle: data.amountCharged,
          wallet: {
            update: {
              amount: {
                decrement: data.amountCharged,
              },
            },
          },
        },
      });
      return new Response("Fincra Response Ingested", { status: 200 });
    }
  } else if (event === "payout.failed") {
    await db.transaction.update({
      where: {
        referenceId: data.customerReference,
      },
      data: {
        status: "FAILED",
        comment: "pay-out failure, failed charge webhook received.",
      },
    });

    return new Response("Fincra webhook received and processed", {
      status: 200,
    });
  }
  // // Get the body
  // const payload = (await req.json()) as FincraChargeEvent;

  // if (payload.event === "charge.successful") {
  //   console.log("HAPPY STUFF HAPPENED");
  // }

  // Do something with the payload
  // For this guide, you simply log the payload to the console

  return new Response("Clerk Response Ingested", { status: 200 });
}
