import { AUTH_SERVICE_CONFIG, AuthServiceConfigSchema, ConfigModule } from "@nest-starter/config";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [ConfigModule.forRoot(AuthServiceConfigSchema, AUTH_SERVICE_CONFIG)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
