import { INJECTION_TOKENS } from "@nest-starter/core";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor(INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
	async process(job: Job<{ to: string; subject: string; body: string }>) {
		console.log("Processing email job");
		console.log("Job ID:", job.id);
		console.log("Payload:", job.data);

		// Simulate email sending
		console.log(`Sending email to ${job.data.to}`);
		console.log(`Subject: ${job.data.subject}`);
		console.log(`Body: ${job.data.body}`);

		return { success: true };
	}
}
