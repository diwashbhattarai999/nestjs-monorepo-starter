import { INJECTION_TOKENS } from "@nest-starter/core";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { EmailProcessor } from "./email.processor";

@Module({
	imports: [BullModule.registerQueue({ name: INJECTION_TOKENS.BULLMQ_EMAIL_QUEUE })],
	providers: [EmailProcessor],
})
export class EmailModule {}
