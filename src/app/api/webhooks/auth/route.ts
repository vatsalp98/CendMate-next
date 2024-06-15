import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "~/env";
import { db } from "~/server/db";
import type { WebhookResponse } from "~/config/models";
import { ComplyCube } from "@complycube/api";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;
  const complycube = new ComplyCube({
    apiKey: env.COMPLYCUBE_KEY,
  });

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = (await req.json()) as WebhookResponse;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  if (evt.type === "user.created") {
    const { data } = payload;

    console.log(
      `Webhook with and ID of ${id} and type of ${eventType}, User creating in DB`,
    );
    const complyClient = await complycube.client.create({
      type: "person",
      email: data.email_addresses[0]!.email_address,
      mobile: data.phone_numbers[0]!.phone_number,
      personDetails: {
        firstName: data.first_name,
        lastName: data.last_name,
      },
    });
    await db.user.create({
      data: {
        phone: data.phone_numbers[0]!.phone_number,
        email: data.email_addresses[0]!.email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        complyClientId: complyClient.id,
        uid: data.id,
        userName:
          data.first_name.substring(0, 3) + data.last_name.substring(0, 3),
      },
    });
    console.log(
      `Webhook with and ID of ${id} and type of ${eventType}, User created in DB`,
    );
  }
  if (evt.type === "user.deleted") {
    const { data } = payload;
    const userDb = await db.user.delete({
      where: {
        uid: data.id,
      },
    });
    await complycube.client.delete(userDb.complyClientId);
  }

  return new Response("Clerk Response Ingested", { status: 200 });
}
