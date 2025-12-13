import type { ZodType } from "zod";

/**
 * Validates the given configuration object against the provided Zod schema.
 *
 * @param config - The configuration object to validate.
 * @param schema - The Zod schema to validate against.
 * @returns The validated configuration object.
 */
// biome-ignore lint/suspicious/noExplicitAny: any is used to allow for any type of schema
export function validateConfig(config: Record<string, unknown>, schema: ZodType<unknown, any, any>): Record<string, unknown> {
	const result = schema.safeParse(config);

	// If validation fails, format and log errors, then exit
	if (!result.success) {
		const errors = result.error.issues.map((err) => ({
			path: err.path.join(".") || "root",
			message: err.message,
		}));

		const errorMessage = `Environment validation failed:\n${errors.map((err) => `  - ${err.path}: ${err.message}`).join("\n")}`;
		console.error("❌", errorMessage);
		process.exit(1);
	}

	// This check is redundant due to the success check above, but added for type safety
	if (!result.data) {
		console.error("❌ Invalid environment configuration");
		process.exit(1);
	}

	// Ensure result.data is a Record<string, unknown>
	return result.data as Record<string, unknown>;
}
