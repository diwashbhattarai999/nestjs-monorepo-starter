export const REDIS_KEYS = {
	enqueueEmailJob: (eventId: string) => `idemp:enqueue:${eventId}`,
	processDataJob: (eventId: string) => `idemp:process:${eventId}`,
};
