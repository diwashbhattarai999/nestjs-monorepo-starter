import { KafkaModule } from "@nest-starter/microservices";
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [KafkaModule],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
