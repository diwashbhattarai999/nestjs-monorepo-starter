import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class EventsController {
	// Listen for message pattern 'auth.request' and reply.
	@MessagePattern("auth.request")
	async handleAuthRequest(@Payload() payload: { hello: string }) {
		console.log("auth-service received payload:", payload);

		// Reply back with an acknowledgement
		return { ok: true, echo: payload };
	}
}
