import { createAuthClient } from "better-auth/react"

const isDev = import.meta.env.isDev;

export const authClient = createAuthClient({
    baseURL: isDev
        ? (import.meta.env.VITE_BASE_URL || "http://localhost:3000")
        : window.location.origin, // Use same-origin in production (goes through Vercel proxy),
    fetchOptions: {
        credentials: "include"
    }
})

export const { signIn, signUp, useSession } = authClient