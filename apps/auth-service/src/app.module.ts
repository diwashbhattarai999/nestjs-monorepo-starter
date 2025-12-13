import { AuthServiceConfigSchema, ConfigModule } from "@nest-starter/config";
import { KafkaModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { EventsModule } from "@/events/events.module";

import { INJECTION_TOKENS } from "../../../packages/core/dist";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [ConfigModule.forRoot(AuthServiceConfigSchema, INJECTION_TOKENS.AUTH_SERVICE_CONFIG), KafkaModule, EventsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
