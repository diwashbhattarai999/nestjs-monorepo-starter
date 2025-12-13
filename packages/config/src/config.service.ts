import { Environment } from "@nest-starter/core";
import { Injectable } from "@nestjs/common";
import { ZodType, z } from "zod";

import { validateConfig } from "@/utils/config.validation";

@Injectable()
export class ConfigService<S extends ZodType> {
	// validated config stored here
	private readonly config: z.infer<S>;

	constructor(private readonly schema: S) {
		// Use process.env as the source of raw environment variables
		// Nest's ConfigService#get is typically used for individual keys; to validate the full env we use process.env
		const env = { ...process.env } as Record<string, unknown>;

		// Validate the environment variables against the schema
		this.config = validateConfig(env, this.schema) as z.infer<S>;
	}

	/**
	 * Get a raw environment variable value by key
	 */
	getRaw<V = unknown>(key: keyof z.infer<S>, defaultValue?: V): V | undefined {
		const value = (this.config as Record<string, unknown>)[String(key)];
		return (value as unknown as V) ?? defaultValue;
	}

	/**
	 * Get the current environment
	 */
	get env(): Environment {
		return ((this.config as Record<string, unknown>).NODE_ENV as Environment) || Environment.Development;
	}

	/**
	 * Check if application is in development mode
	 */
	isDevelopment(): boolean {
		return this.env === Environment.Development;
	}

	/**
	 * Check if application is in production mode
	 */
	isProduction(): boolean {
		return this.env === Environment.Production;
	}

	/**
	 * Check if application is in test mode
	 */
	isTest(): boolean {
		return this.env === Environment.Testing;
	}

	/**
	 * Check if application is in staging mode
	 */
	isStaging(): boolean {
		return this.env === Environment.Staging;
	}
}
