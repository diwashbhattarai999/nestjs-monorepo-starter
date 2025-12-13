import { Environment } from "@nest-starter/core";
import { z } from "zod";

import { DEFAULT_CONFIG } from "@/constants";

/**
 * Auth Service Configuration Schema
 *
 * Defines the expected environment variables for the Auth Service.
 * Utilizes Zod for schema validation to ensure type safety and correctness.
 */
export const AuthServiceConfigSchema = z.object({
	PORT: z.coerce.number().default(DEFAULT_CONFIG.AUTH_SERVICE_PORT),
	NODE_ENV: z.enum(Environment).default(Environment.Local),
	BASE_URL: z.url().min(1, "BASE_URL cannot be empty"),
});

export type AuthServiceConfig = z.infer<typeof AuthServiceConfigSchema>;
