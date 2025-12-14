import { BullModule } from "@nestjs/bullmq";
import { Global, InjectionToken, Module, OptionalFactoryDependency } from "@nestjs/common";

interface BullmqModuleOptions {
	host: string;
	port: number;
	password: string;
	db?: number;
}

interface AsyncBullmqModuleOptions {
	// biome-ignore lint/suspicious/noExplicitAny: Argument of type 'any' is acceptable here
	useFactory: (...args: any[]) => Promise<BullmqModuleOptions> | BullmqModuleOptions;
	inject?: (InjectionToken | OptionalFactoryDependency)[];
}

@Global()
@Module({})
export class BullmqModule {
	static register(options: BullmqModuleOptions) {
		return {
			module: BullmqModule,
			imports: [
				BullModule.forRoot({
					connection: {
						host: options.host,
						port: options.port,
						password: options.password,
						db: options.db ?? 0,
					},
				}),
			],
			exports: [BullModule],
		};
	}

	static registerAsync(options: AsyncBullmqModuleOptions) {
		return {
			module: BullmqModule,
			imports: [
				BullModule.forRootAsync({
					useFactory: async (...args: unknown[]) => {
						const opts = await options.useFactory(...args);
						return {
							connection: {
								host: opts.host,
								port: opts.port,
								password: opts.password,
								db: opts.db ?? 0,
							},
						};
					},
					inject: options.inject || [],
				}),
			],
			exports: [BullModule],
		};
	}
}
