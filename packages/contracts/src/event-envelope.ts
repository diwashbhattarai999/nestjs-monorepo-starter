export interface EventEnvelope<TPayload> {
	/**
	 * Fully-qualified event name
	 * Example: auth.user.created
	 */
	event: string;

	/**
	 * Semantic version of the payload
	 * Example: 1
	 */
	version: number;

	/**
	 * ISO timestamp
	 */
	timestamp: string;

	/**
	 * Unique event ID (UUID)
	 */
	eventId: string;

	/**
	 * Service that produced the event
	 */
	producer: string;

	/**
	 * Actual payload
	 */
	payload: TPayload;
}

export interface EventResponseEnvelope<TData = unknown> {
	/**
	 * Indicates if the event was processed successfully
	 */
	success: boolean;

	/**
	 * Optional message providing additional context
	 */
	message?: string;

	/**
	 * Optional data returned from processing the event
	 */
	data?: TData;
}
