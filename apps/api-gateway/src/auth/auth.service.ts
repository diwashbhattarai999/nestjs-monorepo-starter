import { AuthEvents, UserCreatedEvent, UserCreatedPayload } from "@nest-starter/contracts";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthService implements OnModuleInit {
	constructor(@Inject(INJECTION_TOKENS.KAFKA_SERVICE) private readonly client: ClientKafka) {
		// subscribe to response topics
		this.client.subscribeToResponseOf(AuthEvents.UserCreated_V1);
	}

	async onModuleInit() {
		// ensure client is connected
		await this.client.connect();
	}

	async sendAuthRequest(payload: UserCreatedPayload) {
		// send request and await response from auth-service
		console.log("Sending payload to auth-service:", payload);
		const result = this.client.send(AuthEvents.UserCreated_V1, {
			eventId: crypto.randomUUID(),
			event: AuthEvents.UserCreated_V1,
			timestamp: new Date().toISOString(),
			version: 1,
			producer: "auth-service",
			payload: payload,
		} satisfies UserCreatedEvent);
		return firstValueFrom(result);
	}
}
