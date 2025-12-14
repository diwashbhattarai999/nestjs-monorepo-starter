import { INJECTION_TOKENS } from "@nest-starter/core";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@Processor(INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
	private readonly logger = new Logger(EmailProcessor.name);

	async process(job: Job) {
		this.logger.log(`Processing email job ${job.id}`);

		try {
			// Simulate failure or real email provider
			if (job.data.to.includes("fail")) {
				throw new Error("SMTP provider rejected request");
			}

			this.logger.log(`Email sent to ${job.data.to} | subject: ${job.data.subject}`);
			// biome-ignore lint/suspicious/noExplicitAny: Argument of type 'any' is acceptable here
		} catch (err: any) {
			this.logger.error(`Email job failed: ${job.id}`, err.stack);

			throw err; // REQUIRED so BullMQ retries
		}
	}
}
