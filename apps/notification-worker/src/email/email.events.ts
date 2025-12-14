import { INJECTION_TOKENS } from "@nest-starter/core";
import { InjectQueue, OnWorkerEvent } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bullmq";

export class EmailEvents {
	private readonly logger = new Logger(EmailEvents.name);

	constructor(
		@InjectQueue(INJECTION_TOKENS.BULLMQ_EMAIL_DLQ)
		private readonly dlq: Queue,
	) {}

	@OnWorkerEvent("failed")
	async onFailed(job: Job, error: Error) {
		const maxAttempts = job.opts?.attempts ?? 5;
		if (job.attemptsMade < maxAttempts) {
			return; // still retrying
		}

		this.logger.error(`Job permanently failed → moving to DLQ | jobId=${job.id}`);

		await this.dlq.add(
			"email-dlq",
			{
				originalJobId: job.id,
				data: job.data,
				error: error.message,
				failedAt: new Date().toISOString(),
			},
			{
				removeOnComplete: false,
				removeOnFail: false,
			},
		);
	}
}
