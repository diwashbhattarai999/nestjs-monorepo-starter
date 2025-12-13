import type { ApiGatewayConfig } from "@nest-starter/config";
import { DEFAULT_CONFIG } from "@nest-starter/config";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

async function bootstrap() {
	// Create the NestJS application using the Fastify adapter
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// Enable graceful shutdown hooks
	app.enableShutdownHooks();

	// Retrieve the typed config object provided by ConfigModule
	const config = app.get<ApiGatewayConfig>(INJECTION_TOKENS.API_GATEWAY_CONFIG);
	const port = config?.PORT ?? Number(process.env.PORT) ?? DEFAULT_CONFIG.API_GATEWAY_PORT;

	// Start the application and listen on the specified port and all network interfaces
	await app.listen(port, "0.0.0.0");

	const baseUrl = config.BASE_URL || `http://localhost:${port}`;
	Logger.log(`Server is running on ${baseUrl}`);
}

bootstrap();
