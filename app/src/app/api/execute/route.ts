import { NextRequest, NextResponse } from "next/server";
import { executeCode } from "../../../lib/clients/judge0";
import { logger } from "../../../lib/helpers/logger";


interface ExecuteRequest {
  code: string;
  language: string; 
}

interface ExecuteResponse {
  output?: string;
  error?: string;
  status: string;
}


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { code, language } = (await req.json()) as ExecuteRequest;


    if (!code || !language) {
      logger.warn("Invalid code execution request", { code, language });
      return NextResponse.json({ error: "Missing code or language" }, { status: 400 });
    }


    const languageMap: Record<string, number> = {
      python: 71, 
      javascript: 63, 
    };

    const languageId = languageMap[language.toLowerCase()];
    if (!languageId) {
      logger.warn("Unsupported language", { language });
      return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
    }

    const result = await executeCode(code, languageId);
    if (!result) {
      logger.error("Failed to execute code with Judge0", { language, codeLength: code.length });
      return NextResponse.json({ error: "Failed to execute code" }, { status: 500 });
    }

    const response: ExecuteResponse = {
      output: result.stdout || "",
      error: result.stderr || result.compile_output || "",
      status: result.status?.description || "Unknown",
    };

    logger.info("Code execution successful", { language, status: response.status });
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error("Error in execute API", { error: errorMessage, stack: errorStack });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}