import { DynamicModule, Global, InjectionToken, Module, OptionalFactoryDependency } from "@nestjs/common";

import { IdempotencyService } from "@/redis/idempotency.service";

import { RedisService } from "./redis.service";

export interface RedisModuleOptions {
	host: string;
	port: number;
	password: string;
}

interface AsyncRedisModuleOptions {
	// biome-ignore lint/suspicious/noExplicitAny: Argument of type 'any' is acceptable here
	useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
	inject?: (InjectionToken | OptionalFactoryDependency)[];
}

@Global()
@Module({})
export class RedisModule {
	static forRoot(options: RedisModuleOptions): DynamicModule {
		return {
			module: RedisModule,
			providers: [
				{
					provide: RedisService,
					useValue: new RedisService(options),
				},
				IdempotencyService,
			],
			exports: [RedisService, IdempotencyService],
		};
	}

	static forRootAsync(options: AsyncRedisModuleOptions): DynamicModule {
		return {
			module: RedisModule,
			imports: [],
			providers: [
				{
					provide: RedisService,
					useFactory: async (...args: unknown[]) => {
						const opts = await options.useFactory(...args);
						return new RedisService(opts);
					},
					inject: options.inject || [],
				},
				IdempotencyService,
			],
			exports: [RedisService, IdempotencyService],
		};
	}
}
