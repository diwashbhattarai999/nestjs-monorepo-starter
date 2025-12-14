import { z } from "zod";

import { EventEnvelope, EventResponseEnvelope } from "@/event-envelope";

export const UserCreatedPayloadSchema = z.object({
	userId: z.string(),
	email: z.email(),
	createdAt: z.iso.datetime(),
});

export const UserCreatedNotificationPayloadSchema = z.object({
	userId: z.string(),
	email: z.email(),
	subject: z.string(),
	body: z.string(),
});

export type UserCreatedPayload = z.infer<typeof UserCreatedPayloadSchema>;
export type UserCreatedEvent = EventEnvelope<UserCreatedPayload>;
export type UserCreatedEventResponse<T> = EventResponseEnvelope<T>;

export type UserCreatedNotificationPayload = z.infer<typeof UserCreatedNotificationPayloadSchema>;
export type UserCreatedNotificationEvent = EventEnvelope<UserCreatedNotificationPayload>;
