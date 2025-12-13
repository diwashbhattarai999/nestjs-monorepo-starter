import { INJECTION_TOKENS } from "@nest-starter/core";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class EventsService implements OnModuleInit {
	constructor(@Inject(INJECTION_TOKENS.KAFKA_SERVICE) private readonly client: ClientKafka) {
		// subscribe to response topics
		this.client.subscribeToResponseOf("auth.request");
	}

	async onModuleInit() {
		// ensure client is connected
		await this.client.connect();
	}

	async sendAuthRequest(payload: { hello: string }) {
		// send request and await response from auth-service
		console.log("Sending payload to auth-service:", payload);
		const result = this.client.send("auth.request", payload);
		return firstValueFrom(result);
	}
}
