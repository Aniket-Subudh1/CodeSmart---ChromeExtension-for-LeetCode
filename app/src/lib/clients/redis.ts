import Redis from "ioredis";
import { logger } from "../helpers/logger";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  retryStrategy: (times) => {
    logger.warn("Redis connection retry", { attempt: times });
    return Math.min(times * 50, 2000);
  },
});

redisClient.on("error", (error) => {
  logger.error("Redis connection error", { error: error.message });
});

export { redisClient };