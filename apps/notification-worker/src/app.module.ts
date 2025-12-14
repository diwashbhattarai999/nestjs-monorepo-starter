import { ConfigModule, NotificationWorkerConfig, NotificationWorkerConfigSchema } from "@nest-starter/config";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { RedisModule } from "@nest-starter/database";
import { BullmqModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { EmailModule } from "@/email/email.module";

@Module({
	imports: [
		ConfigModule.forRoot(NotificationWorkerConfigSchema, INJECTION_TOKENS.NOTIFICATION_WORKER_CONFIG),

		BullmqModule.registerAsync({
			inject: [INJECTION_TOKENS.NOTIFICATION_WORKER_CONFIG],
			useFactory: (config: NotificationWorkerConfig) => ({
				host: config.REDIS_HOST,
				port: config.REDIS_PORT,
				password: config.REDIS_PASSWORD,
			}),
		}),

		RedisModule.forRootAsync({
			inject: [INJECTION_TOKENS.NOTIFICATION_WORKER_CONFIG],
			useFactory: (config: NotificationWorkerConfig) => ({
				host: config.REDIS_HOST,
				port: config.REDIS_PORT,
				password: config.REDIS_PASSWORD,
			}),
		}),

		EmailModule,
	],
})
export class AppModule {}
