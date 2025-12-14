import { DynamicModule, InjectionToken, Module, OptionalFactoryDependency } from "@nestjs/common";

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
			],
			exports: [RedisService],
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
			],
			exports: [RedisService],
		};
	}
}
