import { Environment } from "@nest-starter/core";
import { z } from "zod";

import { DEFAULT_CONFIG } from "@/constants";

/**
 * Notification Service Configuration Schema
 *
 * Defines the expected environment variables for the Notification service.
 * Utilizes Zod for schema validation to ensure type safety and correctness.
 */
export const NotificationServiceConfigSchema = z.object({
	PORT: z.coerce.number().default(DEFAULT_CONFIG.NOTIFICATION_SERVICE_PORT),
	NODE_ENV: z.enum(Environment).default(Environment.Local),
	BASE_URL: z.url().min(1, "BASE_URL cannot be empty"),

	KAFKA_BROKERS: z.string({ error: "Kafka Brokers is required." }).default("localhost:9092"),
	KAFKA_CLIENT_ID: z.string({ error: "Kafka Client ID is required." }),
	KAFKA_GROUP_ID: z.string({ error: "Kafka Group ID is required." }).default("notification-service-group"),

	REDIS_HOST: z.string({ error: "Redis Host is required." }).default("localhost"),
	REDIS_PORT: z.coerce.number().default(6379),
	REDIS_PASSWORD: z.string({ error: "Redis Password is required." }),
});

export type NotificationServiceConfig = z.infer<typeof NotificationServiceConfigSchema>;
