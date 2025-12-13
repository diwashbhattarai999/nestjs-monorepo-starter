import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { ConfigModule as NestConfigModule, ConfigService as NestConfigService } from "@nestjs/config";
import type { ZodType } from "zod";

import { ConfigService } from "./config.service";
import { validateConfig } from "./utils/config.validation";

@Global()
@Module({})
export class ConfigModule {
	/**
	 * Create a dynamic module that provides both a ConfigService and a typed config value under `configToken`.
	 * Consumers can `app.get<T>(configToken)` to receive a type-safe config object.
	 */
	static forRoot<T extends ZodType>(schema: T, configToken: symbol, options?: { envFilePath?: string[] }): DynamicModule {
		// Provider for raw validated config object
		const configProvider: Provider = {
			provide: configToken,
			useFactory: () => validateConfig({ ...process.env }, schema),
			inject: [NestConfigService],
		};

		// Provider for ConfigService
		const serviceProvider: Provider = {
			provide: ConfigService,
			useFactory: () => new ConfigService(schema as ZodType),
		};

		// Construct env file lookup order. Include common patterns and ensure .env is last.
		const defaultEnvFilePaths = [
			`.env.${process.env.NODE_ENV}.local`,
			`.env.${process.env.NODE_ENV}`,
			".env.local",
			".env.development.local",
			".env",
		];

		const envFilePaths = options?.envFilePath ?? defaultEnvFilePaths;

		return {
			module: ConfigModule,
			imports: [NestConfigModule.forRoot({ isGlobal: true, envFilePath: envFilePaths })],
			providers: [configProvider, serviceProvider],
			exports: [configProvider, serviceProvider],
		};
	}
}
