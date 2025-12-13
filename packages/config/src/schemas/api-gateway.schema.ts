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
	KAFKA_BROKERS: z.string({ error: "Kafka Brokers is required." }).default("localhost:9092"),
	KAFKA_CLIENT_ID: z.string({ error: "Kafka Client ID is required." }),
	KAFKA_GROUP_ID: z.string({ error: "Kafka Group ID is required." }).default("api-gateway-group"),
});

export type ApiGatewayConfig = z.infer<typeof ApiGatewayConfigSchema>;
