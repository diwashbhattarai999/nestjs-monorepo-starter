/**
 * Token for API Gateway config
 *
 * Used for injecting the typed config into Nest services
 */
export const API_GATEWAY_CONFIG = Symbol.for("API_GATEWAY_CONFIG");
export const AUTH_SERVICE_CONFIG = Symbol.for("AUTH_SERVICE_CONFIG");
