import { AuthEvents, UserCreatedEvent, UserCreatedNotificationEvent } from "@nest-starter/contracts";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AuthController implements OnModuleInit {
	constructor(@Inject(INJECTION_TOKENS.KAFKA_SERVICE) private readonly client: ClientKafka) {}

	async onModuleInit() {
		// ensure client is connected
		await this.client.connect();
	}

	/**
	 * Handle UserCreated event
	 */
	@MessagePattern(AuthEvents.UserCreated_V1)
	async handleUserCreated(@Payload() payload: UserCreatedEvent) {
		console.log("UserCreated event received:", payload);

		console.log(`Creating user with ID: ${payload.payload.userId} and email: ${payload.payload.email}`);
		// Emit event to notification-service to send an email
		this.client.emit(AuthEvents.UserCreated_Notification_V1, {
			eventId: crypto.randomUUID(),
			event: AuthEvents.UserCreated_Notification_V1,
			timestamp: new Date().toISOString(),
			version: 1,
			producer: "auth-service",
			payload: {
				userId: payload.payload.userId,
				email: payload.payload.email,
				subject: "Welcome to Our Service!",
				body: `Hello, your account has been created successfully.`,
			},
		} satisfies UserCreatedNotificationEvent);

		console.log(`Emitted UserCreated_Notification event for user ID: ${payload.payload.userId}`);

		// Reply back with an acknowledgement
		return {
			status: "success",
			message: `User with ID ${payload.payload.userId} created successfully in auth-service.`,
		};
	}
}
