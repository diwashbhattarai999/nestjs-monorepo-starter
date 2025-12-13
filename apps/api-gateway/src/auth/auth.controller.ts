import { UserCreatedPayload } from "@nest-starter/contracts";
import { Controller, Get } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("/create-user")
	async pingAuth() {
		const payload: UserCreatedPayload = {
			email: "john.doe@example.com",
			userId: "12345",
			createdAt: new Date().toISOString(),
		};
		const res = await this.authService.sendAuthRequest(payload);
		console.log("Received response from auth-service:", res);
		return { ok: true, res };
	}
}
