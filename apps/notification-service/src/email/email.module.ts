import { INJECTION_TOKENS } from "@nest-starter/core";
import { IdempotencyService } from "@nest-starter/microservices";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { EmailService } from "./email.service";

@Module({
	imports: [
		BullModule.registerQueue({ name: INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE }),
		BullModule.registerQueue({ name: INJECTION_TOKENS.BULLMQ_EMAIL_DLQ }),
	],
	providers: [EmailService, IdempotencyService],
	exports: [EmailService],
})
export class EmailModule {}
