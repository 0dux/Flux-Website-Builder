import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().optional(),
    TRUSTED_ORIGINS: z.string().optional(),
    DATABASE_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
    NODE_ENV: z.string(),
    OPENROUTER_API_KEY: z.string()
});

let envs: {
    PORT: number;
    TRUSTED_ORIGINS: string[];
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    NODE_ENV: string;
    OPENROUTER_API_KEY: string;
};

try {
    const parsedEnv = envSchema.parse(process.env);

    // Transform and validate values
    const port = parsedEnv.PORT ? parseInt(parsedEnv.PORT, 10) : 3000;
    const trustedOrigins = parsedEnv.TRUSTED_ORIGINS
        ? parsedEnv.TRUSTED_ORIGINS.split(',').map(origin => origin.trim())
        : ['http://localhost:3000'];

    // Validate port is a positive number
    if (isNaN(port) || port <= 0) {
        throw new Error('PORT must be a valid positive number');
    }

    envs = {
        PORT: port,
        TRUSTED_ORIGINS: trustedOrigins,
        DATABASE_URL: parsedEnv.DATABASE_URL,
        BETTER_AUTH_SECRET: parsedEnv.BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: parsedEnv.BETTER_AUTH_URL,
        NODE_ENV: parsedEnv.NODE_ENV,
        OPENROUTER_API_KEY: parsedEnv.OPENROUTER_API_KEY,
    };
} catch (error) {
    console.error("Error occurred during validation of environment variables:", error);
    process.exit(1);
}


export default envs;


