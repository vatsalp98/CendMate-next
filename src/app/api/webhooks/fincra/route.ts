import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "~/env";
import { db } from "~/server/db";
import type { FincraChargeEvent, WebhookResponse } from "~/config/models";
import crypto from "crypto";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.FINCRA_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Fincra Dashboard to .env or .env.local",
    );
  }
  const encryptedData = crypto
    .createHmac("SHA512", WEBHOOK_SECRET)
    .update(JSON.stringify(await req.json()))
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

  // console.log("BODY", JSON.stringify(await req.json()));
  console.log("BODY", req);
  // // Get the body
  // const payload = (await req.json()) as FincraChargeEvent;

  // if (payload.event === "charge.successful") {
  //   console.log("HAPPY STUFF HAPPENED");
  // }

  // Do something with the payload
  // For this guide, you simply log the payload to the console

  return new Response("Clerk Response Ingested", { status: 200 });
}
