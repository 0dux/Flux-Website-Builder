import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import envs from "../config/env.js";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        deleteUser: {
            enabled: true,
        }
    },
    baseURL: envs.BETTER_AUTH_URL,
    trustedOrigins: [envs.TRUSTED_ORIGIN],
    socialProviders: {
        google: {
            clientId: envs.GOOGLE_CLIENT_ID,
            clientSecret: envs.GOOGLE_CLIENT_SECRET,
            redirectURI: `${envs.BETTER_AUTH_URL}api/auth/callback/google`
        }
    },
    secret: envs.BETTER_AUTH_SECRET,
    advanced: {
        cookies: {
            session_token: {
                name: "auth_session",
                attributes: {
                    httpOnly: true,
                    secure: envs.NODE_ENV === "PRODUCTION",
                    sameSite: envs.NODE_ENV === "PRODUCTION" ? "none" : "Lax",
                    path: "/"
                }
            }
        }
    }
});