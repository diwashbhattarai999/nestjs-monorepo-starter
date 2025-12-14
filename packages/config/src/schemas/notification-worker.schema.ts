import { z } from "zod";

/**
 * Notification Worker Configuration Schema
 *
 * Defines the expected environment variables for the Notification worker.
 * Utilizes Zod for schema validation to ensure type safety and correctness.
 */
export const NotificationWorkerConfigSchema = z.object({
	REDIS_HOST: z.string({ error: "Redis Host is required." }).default("localhost"),
	REDIS_PORT: z.coerce.number().default(6379),
	REDIS_PASSWORD: z.string({ error: "Redis Password is required." }),
});

export type NotificationWorkerConfig = z.infer<typeof NotificationWorkerConfigSchema>;
