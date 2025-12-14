import { INJECTION_TOKENS } from "@nest-starter/core";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { EmailService } from "./email.service";

@Module({
	imports: [
		BullModule.registerQueue({ name: INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE }),
		BullModule.registerQueue({ name: INJECTION_TOKENS.BULLMQ_EMAIL_DLQ }),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
