import { ConfigModule, NotificationServiceConfig, NotificationServiceConfigSchema } from "@nest-starter/config";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { BullmqModule, KafkaModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { AuthModule } from "@/auth/auth.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot(NotificationServiceConfigSchema, INJECTION_TOKENS.NOTIFICATION_SERVICE_CONFIG),
		KafkaModule.registerAsync({
			inject: [INJECTION_TOKENS.NOTIFICATION_SERVICE_CONFIG],
			useFactory: (config: NotificationServiceConfig) => ({
				clientId: config.KAFKA_CLIENT_ID,
				groupId: config.KAFKA_GROUP_ID,
				brokers: [config.KAFKA_BROKERS],
			}),
		}),
		BullmqModule.registerAsync({
			inject: [INJECTION_TOKENS.NOTIFICATION_SERVICE_CONFIG],
			useFactory: (config: NotificationServiceConfig) => ({
				host: config.REDIS_HOST,
				port: config.REDIS_PORT,
				password: config.REDIS_PASSWORD,
			}),
		}),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
