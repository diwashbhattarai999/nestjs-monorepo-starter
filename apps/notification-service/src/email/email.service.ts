import { INJECTION_TOKENS } from "@nest-starter/core";
import { IdempotencyService, REDIS_KEYS } from "@nest-starter/database";
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class EmailService {
	constructor(
		private readonly idempotency: IdempotencyService,
		@InjectQueue(INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE)
		private readonly emailQueue: Queue,
	) {}

	async sendEmailJob(data: { to: string; subject: string; body: string }, eventId: string) {
		const key = REDIS_KEYS.enqueueEmailJob(eventId);

		// Try to acquire idempotency lock
		const acquired = await this.idempotency.tryAcquireLock(key, 60 * 10); // 10 min

		// If lock not acquired, it means the job has already been enqueued
		if (!acquired) return;

		// Enqueue the email job
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
