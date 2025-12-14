import { INJECTION_TOKENS } from "@nest-starter/core";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { EmailEvents } from "@/email/email.events";

import { EmailProcessor } from "./email.processor";

@Module({
	imports: [
		BullModule.registerQueue({ name: INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE }),
		BullModule.registerQueue({ name: INJECTION_TOKENS.BULLMQ_EMAIL_DLQ }),
	],
	providers: [EmailProcessor, EmailEvents],
})
export class EmailModule {}
