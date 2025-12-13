import { KafkaModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { EventsController } from "./events.controller";

@Module({
	imports: [KafkaModule],
	controllers: [EventsController],
})
export class EventsModule {}
