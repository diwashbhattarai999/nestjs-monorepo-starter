import { INJECTION_TOKENS } from "@nest-starter/core";
import { DynamicModule, Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

interface KafkaModuleOptions {
	clientId: string;
	groupId: string;
	brokers: string[];
	subscribeFromBeginning?: boolean;
}

interface AsyncKafkaModuleOptions {
	// biome-ignore lint/suspicious/noExplicitAny: Argument of type 'any' is acceptable here
	useFactory: (...args: any[]) => Promise<KafkaModuleOptions> | KafkaModuleOptions;
	inject?: unknown[];
}

@Global()
@Module({})
export class KafkaModule {
	static register(options: KafkaModuleOptions): DynamicModule {
		return {
			module: KafkaModule,
			imports: [
				ClientsModule.register([
					{
						name: INJECTION_TOKENS.KAFKA_SERVICE,
						transport: Transport.KAFKA,
						options: {
							client: {
								brokers: options.brokers,
								clientId: options.clientId,
							},
							consumer: {
								groupId: options.groupId,
							},
							subscribe: { fromBeginning: options.subscribeFromBeginning ?? true },
						},
					},
				]),
			],
			exports: [ClientsModule],
		};
	}

	static registerAsync(options: AsyncKafkaModuleOptions): DynamicModule {
		return {
			module: KafkaModule,
			imports: [
				ClientsModule.registerAsync([
					{
						name: INJECTION_TOKENS.KAFKA_SERVICE,
						useFactory: async (...args: unknown[]) => {
							const opts = await options.useFactory(...args);
							return {
								transport: Transport.KAFKA,
								options: {
									client: {
										brokers: opts.brokers,
										clientId: opts.clientId,
									},
									consumer: {
										groupId: opts.groupId,
									},
									subscribe: { fromBeginning: opts.subscribeFromBeginning ?? true },
								},
							};
						},
						inject: options.inject || [],
					},
				]),
			],
			exports: [ClientsModule],
		};
	}
}
