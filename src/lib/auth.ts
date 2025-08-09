import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";
 
export const auth = betterAuth({
     emailAndPassword: {
     enabled: true,
   },
     socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY as string,
      }
   },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    user: {
      modelName: "userTable"
    },
    session: {
      modelName: "sessionTable"
    },
    account: {
      modelName: "accountTable"
    },
    product: {
      modelName: "productTable"
    },
    verification: {
      modelName: "verificationTable"
    },
    cart: {
      modelName: "cartTable"
    }
});