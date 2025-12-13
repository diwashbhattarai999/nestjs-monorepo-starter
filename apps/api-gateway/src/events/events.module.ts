import { KafkaModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";

@Module({
	imports: [KafkaModule],
	providers: [EventsService],
	controllers: [EventsController],
})
export class EventsModule {}
