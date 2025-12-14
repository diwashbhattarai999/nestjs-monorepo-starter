import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

import { RedisService } from "@/redis/redis.service";

@Injectable()
export class IdempotencyService {
	private readonly redis: Redis;

	constructor(redisService: RedisService) {
		this.redis = redisService.getClient();
	}

	/**
	 * Try to acquire idempotency lock
	 * Returns false if already processed
	 */
	async tryAcquireLock(key: string, ttlSeconds: number): Promise<boolean> {
		const result = await this.redis.set(
			key,
			"1",
			"EX",
			ttlSeconds,
			"NX", // atomic lock
		);

		return result === "OK";
	}

	/**
	 * Mark job as completed
	 * TTL is extended to retain history
	 */
	async markCompleted(key: string, ttlSeconds: number): Promise<void> {
		await this.redis.set(key, "done", "EX", ttlSeconds);
	}

	/**
	 * Remove lock explicitly (used on fatal failure)
	 */
	async release(key: string): Promise<void> {
		await this.redis.del(key);
	}
}
