import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().optional(),
    TRUSTED_ORIGINS: z.string().optional(),
    DATABASE_URL: z.string().optional(),
});

let env: {
    PORT: number;
    TRUSTED_ORIGINS: string[];
    DATABASE_URL: string;
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

    env = {
        PORT: port,
        TRUSTED_ORIGINS: trustedOrigins,
        DATABASE_URL: parsedEnv.DATABASE_URL as string
    };
} catch (error) {
    console.error("Error occurred during validation of environment variables:", error);
    process.exit(1);
}


export default env;


