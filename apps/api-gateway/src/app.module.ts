import { ApiGatewayConfigSchema, ConfigModule } from "@nest-starter/config";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { KafkaModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [ConfigModule.forRoot(ApiGatewayConfigSchema, INJECTION_TOKENS.API_GATEWAY_CONFIG), KafkaModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
