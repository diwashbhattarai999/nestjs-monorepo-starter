import { Module } from "@nestjs/common";

import { EmailModule } from "@/email/email.module";

import { AuthController } from "./auth.controller";

@Module({
	imports: [EmailModule],
	controllers: [AuthController],
})
export class AuthModule {}
