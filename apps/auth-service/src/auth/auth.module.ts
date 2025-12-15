import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service.js";
import { AuthController } from "./auth.controller";

@Module({
	controllers: [AuthController],
	providers: [PrismaService],
})
export class AuthModule {}
