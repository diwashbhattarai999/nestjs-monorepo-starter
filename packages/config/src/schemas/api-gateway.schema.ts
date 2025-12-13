import { Environment } from "@nest-starter/core";
import { z } from "zod";

import { DEFAULT_CONFIG } from "@/constants";

/**
 * API Gateway Configuration Schema
 *
 * Defines the expected environment variables for the API Gateway service.
 * Utilizes Zod for schema validation to ensure type safety and correctness.
 */
export const ApiGatewayConfigSchema = z.object({
	PORT: z.coerce.number().default(DEFAULT_CONFIG.API_GATEWAY_PORT),
	NODE_ENV: z.enum(Environment).default(Environment.Local),
	BASE_URL: z.url().min(1, "BASE_URL cannot be empty"),
});

export type ApiGatewayConfig = z.infer<typeof ApiGatewayConfigSchema>;
