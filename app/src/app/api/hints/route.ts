import { NextRequest, NextResponse } from "next/server";
import { redisClient } from "../../../lib/clients/redis";
import { getHint } from "../../../lib/clients/gemini";
import { logger } from "../../../lib/helpers/logger"; 


interface HintRequest {
  problem: string;
}


interface HintResponse {
  hint: string;
  cached?: boolean;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { problem } = (await req.json()) as HintRequest;


    if (!problem || typeof problem !== "string") {
      logger.warn("Invalid problem name in hint request", { problem });
      return NextResponse.json({ error: "Invalid problem name" }, { status: 400 });
    }

    const cacheKey = `hint:${problem}`;


    const cachedHint = await redisClient.get(cacheKey);
    if (cachedHint) {
      logger.info("Hint served from cache", { problem, cacheKey });
      return NextResponse.json({ hint: cachedHint, cached: true }, { status: 200 });
    }


    const hint = await getHint(problem);
    if (!hint) {
      logger.error("Failed to fetch hint from Gemini API", { problem });
      return NextResponse.json({ error: "Failed to fetch hint" }, { status: 500 });
    }


    await redisClient.set(cacheKey, hint, 'EX', 3600);
    logger.info("Hint fetched and cached", { problem, cacheKey });

    return NextResponse.json({ hint, cached: false }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error("Error in hints API", { error: errorMessage, stack: errorStack });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const problem = searchParams.get("problem");

  if (!problem) {
    logger.warn("Missing problem parameter in GET request");
    return NextResponse.json({ error: "Missing problem parameter" }, { status: 400 });
  }

  const cacheKey = `hint:${problem}`;
  const cachedHint = await redisClient.get(cacheKey);

  return NextResponse.json({ cached: !!cachedHint }, { status: 200 });
}