import { AuthServiceConfig, AuthServiceConfigSchema, ConfigModule } from "@nest-starter/config";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { KafkaModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { AuthModule } from "@/auth/auth.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot(AuthServiceConfigSchema, INJECTION_TOKENS.AUTH_SERVICE_CONFIG),
		KafkaModule.registerAsync({
			inject: [INJECTION_TOKENS.AUTH_SERVICE_CONFIG],
			useFactory: (config: AuthServiceConfig) => ({
				clientId: config.KAFKA_CLIENT_ID,
				groupId: config.KAFKA_GROUP_ID,
				brokers: [config.KAFKA_BROKERS],
			}),
		}),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
