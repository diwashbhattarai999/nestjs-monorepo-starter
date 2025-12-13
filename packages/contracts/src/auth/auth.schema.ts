import { z } from "zod";

import { EventEnvelope, EventResponseEnvelope } from "@/event-envelope";

export const UserCreatedPayloadSchema = z.object({
	userId: z.string(),
	email: z.email(),
	createdAt: z.iso.datetime(),
});

export type UserCreatedPayload = z.infer<typeof UserCreatedPayloadSchema>;
export type UserCreatedEvent = EventEnvelope<UserCreatedPayload>;
export type UserCreatedEventResponse<T> = EventResponseEnvelope<T>;
