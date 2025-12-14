import { AuthEvents, UserCreatedNotificationEvent } from "@nest-starter/contracts";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { EmailService } from "@/email/email.service";

@Controller()
export class AuthController {
	constructor(private readonly emailService: EmailService) {}

	/**
	 * Handle UserCreated event
	 */
	@MessagePattern(AuthEvents.UserCreated_Notification_V1)
	async sendUserCreatedNotification(@Payload() payload: UserCreatedNotificationEvent) {
		console.log("UserCreatedNotification event received:", payload);

		// Here, you would integrate with an email service to send the actual email.
		console.log(`Sending email to ${payload.payload.email} with subject: ${payload.payload.subject}`);

		// Enqueue email job
		await this.emailService.sendEmailJob({
			to: payload.payload.email,
			subject: payload.payload.subject,
			body: payload.payload.body,
		});
	}
}
