import { db } from '@repo/db';
import { account, session, user, verification } from '@repo/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';


export const auth = betterAuth({
    trustedOrigins: [process.env.WEB_URL!],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            verification,
            account
        }
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
        //or any other social provider
    }
})