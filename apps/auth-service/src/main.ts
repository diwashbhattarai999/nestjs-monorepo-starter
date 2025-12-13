import type { ApiGatewayConfig } from "@nest-starter/config";
import { DEFAULT_CONFIG } from "@nest-starter/config";
import { INJECTION_TOKENS } from "@nest-starter/core";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	app.enableShutdownHooks();

	const config = app.get<ApiGatewayConfig>(INJECTION_TOKENS.AUTH_SERVICE_CONFIG);
	const port = config?.PORT ?? Number(process.env.PORT) ?? DEFAULT_CONFIG.AUTH_SERVICE_PORT;

	/**
	 * Kafka microservice (consumer)
	 */
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: config.KAFKA_CLIENT_ID || "api-gateway-client",
				brokers: [config.KAFKA_BROKERS],
			},
			consumer: {
				groupId: config.KAFKA_GROUP_ID || "api-gateway-consumer",
			},
		},
	});

	/**
	 * Start Kafka consumer
	 */
	await app.startAllMicroservices();

	/**
	 * Start HTTP server
	 */
	await app.listen(port, "0.0.0.0");

	Logger.log(`HTTP server running on ${config.BASE_URL}`);
	Logger.log(`Kafka consumer started`);
}

bootstrap();
