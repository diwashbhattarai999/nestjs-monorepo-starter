import { Controller, Get } from "@nestjs/common";

import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@Get("/ping-auth")
	async pingAuth() {
		const payload = { hello: "from-api-gateway" };
		const res = await this.eventsService.sendAuthRequest(payload);
		console.log("Received response from auth-service:", res);
		return { ok: true, res };
	}
}
