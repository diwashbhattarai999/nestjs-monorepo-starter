import { INJECTION_TOKENS } from "@nest-starter/core";
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class EmailService {
	constructor(
		@InjectQueue(INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE)
		private readonly emailQueue: Queue,
	) {}

	async sendEmailJob(data: { to: string; subject: string; body: string }, eventId: string) {
		await this.emailQueue.add("send-email", data, {
			jobId: eventId,
			attempts: 3,
			backoff: {
				type: "exponential",
				delay: 5000,
			},
			removeOnComplete: true,
			removeOnFail: false,
		});

		console.log("Email job enqueued:", data);
	}
}
