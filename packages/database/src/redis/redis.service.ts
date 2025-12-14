import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

import { RedisModuleOptions } from "./redis.module";

@Injectable()
export class RedisService implements OnModuleDestroy {
	private client: Redis;

	constructor(options: RedisModuleOptions) {
		this.client = new Redis({
			host: options.host || "localhost",
			port: options.port || 6379,
			password: options.password,
		});
	}

	getClient(): Redis {
		return this.client;
	}

	async onModuleDestroy() {
		await this.client.quit();
	}
}
