import { INJECTION_TOKENS } from "@nest-starter/core";
import { IdempotencyService, REDIS_KEYS } from "@nest-starter/microservices";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@Processor(INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
	private readonly logger = new Logger(EmailProcessor.name);

	constructor(private readonly idempotency: IdempotencyService) {
		super();
	}

	async process(job: Job) {
		this.logger.log(`Processing email job ${job.id}`);

		const key = REDIS_KEYS.processDataJob(job.id as string);
		const acquired = await this.idempotency.tryAcquireLock(key, 60 * 60); // 1 hour

		if (!acquired) {
			this.logger.warn(`Duplicate job skipped: ${job.id}`);
			return;
		}

		try {
			// Simulate failure or real email provider
			if (job.data.to.includes("fail")) {
				throw new Error("SMTP provider rejected request");
			}

			this.logger.log(`Email sent to ${job.data.to} | subject: ${job.data.subject}`);

			await this.idempotency.markCompleted(
				key,
				60 * 60 * 24, // keep history 24h
			);
			// biome-ignore lint/suspicious/noExplicitAny: Argument of type 'any' is acceptable here
		} catch (err: any) {
			this.logger.error(`Email job failed: ${job.id}`, err.stack);

			// Allow retry by releasing lock
			await this.idempotency.release(key);

			// Re-throw error to let BullMQ handle retries
			throw err;
		}
	}
}
