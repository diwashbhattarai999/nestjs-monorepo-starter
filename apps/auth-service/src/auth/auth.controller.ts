import { AuthEvents, UserCreatedEvent } from "@nest-starter/contracts";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AuthController {
	/**
	 * Handle UserCreated event
	 */
	@MessagePattern(AuthEvents.UserCreated_V1)
	async handleUserCreated(@Payload() payload: UserCreatedEvent) {
		console.log("UserCreated event received:", payload);

		// Reply back with an acknowledgement
		return {
			status: "success",
			message: `User with ID ${payload.payload.userId} created successfully in auth-service.`,
		};
	}
}
