import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URI: z.string(),
    CLERK_SECRET_KEY: z.string(),
    WEBHOOK_SECRET: z.string(),
    FINCRA_API_KEY: z.string(),
    FINCRA_X_PUB_KEY: z.string(),
    FINCRA_BUSINESS_ID: z.string(),
    FINCRA_URL: z.string(),
    MAPLERAD_URL: z.string(),
    MAPLERAD_SK: z.string(),
    COMPLYCUBE_KEY: z.string(),
    FINCRA_WEBHOOK_SECRET: z.string(),
    COMPLYCUBE_WEBHOOK_SECRET: z.string(),
    NIUM_CLIENT_ID: z.string(),
    NIUM_CUSTOMER_HASH_ID: z.string(),
    NIUM_URL: z.string(),
    NIUM_API_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_MAPBOX_KEY: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    // DB URL
    DATABASE_URI: process.env.DATABASE_URI,
    // MAPBOX
    NEXT_PUBLIC_MAPBOX_KEY: process.env.NEXT_PUBLIC_MAPBOX_KEY,
    // CLERK
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // FINCRA
    FINCRA_URL: process.env.FINCRA_URL,
    FINCRA_API_KEY: process.env.FINCRA_API_KEY,
    FINCRA_X_PUB_KEY: process.env.FINCRA_X_PUB_KEY,
    FINCRA_BUSINESS_ID: process.env.FINCRA_BUSINESS_ID,
    FINCRA_WEBHOOK_SECRET: process.env.FINCRA_WEBHOOK_SECRET,
    // MapleRad
    MAPLERAD_URL: process.env.MAPLERAD_URL,
    MAPLERAD_SK: process.env.MAPLERAD_SK,
    // COMPLYCUBE
    COMPLYCUBE_KEY: process.env.COMPLYCUBE_KEY,
    COMPLYCUBE_WEBHOOK_SECRET: process.env.COMPLYCUBE_WEBHOOK_SECRET,
    // NIUM
    NIUM_CLIENT_ID: process.env.NIUM_CLIENT_ID,
    NIUM_CUSTOMER_HASH_ID: process.env.NIUM_CUSTOMER_HASH_ID,
    NIUM_URL: process.env.NIUM_URL,
    NIUM_API_KEY: process.env.NIUM_API_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
