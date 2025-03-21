import { NextRequest, NextResponse } from "next/server";
import { produceMessage } from "../../../lib/clients/kafka";
import { io } from "../../../lib/clients/socket";
import { logger } from "../../../lib/helpers/logger";


interface CollabRequest {
  problem: string;
  message: string;
  userId: string;
}


interface CollabResponse {
  success: boolean;
}


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { problem, message, userId } = (await req.json()) as CollabRequest;


    if (!problem || !message || !userId) {
      logger.warn("Invalid collaboration request", { problem, message, userId });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const kafkaMessage = { problem, message, userId, timestamp: new Date().toISOString() };
    await produceMessage("collab-events", kafkaMessage);
    logger.info("Collaboration event logged to Kafka", { problem, userId });

    io.to(problem).emit("chat", { userId, message, timestamp: kafkaMessage.timestamp });
    logger.info("Chat message broadcasted", { problem, userId, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error("Error in collab API", { error: errorMessage, stack: errorStack });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}