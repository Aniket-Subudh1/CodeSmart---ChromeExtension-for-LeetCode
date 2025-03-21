import { Kafka } from "kafkajs";
import { logger } from "../helpers/logger";

const kafka = new Kafka({
  clientId: "codesmart",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  retry: {
    initialRetryTime: 100,
    retries: 5,
  },
});

const producer = kafka.producer();

export async function produceMessage(topic: string, message: any): Promise<void> {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    logger.info("Message produced to Kafka", { topic, message });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error("Failed to produce message to Kafka", { topic, error: errorMessage });
    throw error;
  } finally {
    await producer.disconnect();
  }
}