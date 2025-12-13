import { API_GATEWAY_CONFIG, ApiGatewayConfigSchema, ConfigModule } from "@nest-starter/config";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [ConfigModule.forRoot(ApiGatewayConfigSchema, API_GATEWAY_CONFIG)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
