import { INJECTION_TOKENS } from "@nest-starter/core";
import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

// Read kafka configuration from environment variables (loaded by ConfigModule)
function parseBrokers(brokers?: string) {
	if (!brokers) return ["localhost:9092"];
	return brokers
		.split(",")
		.map((b) => b.trim())
		.filter(Boolean);
}

@Global()
@Module({
	imports: [
		ClientsModule.register([
			{
				name: INJECTION_TOKENS.KAFKA_SERVICE,
				transport: Transport.KAFKA,
				options: {
					client: {
						brokers: parseBrokers(process.env.KAFKA_BROKERS),
						clientId: process.env.KAFKA_CLIENT_ID ?? "nestjs-client",
					},
					consumer: {
						groupId: process.env.KAFKA_GROUP_ID ?? "nestjs-microservice-group",
					},
					subscribe: { fromBeginning: true },
				},
			},
		]),
	],
	exports: [ClientsModule],
})
export class KafkaModule {}
