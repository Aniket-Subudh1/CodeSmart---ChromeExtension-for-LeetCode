import { logger } from "../helpers/logger";

const JUDGE0_API_URL = "https://judge0-ce.judge0.com/submissions";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || ""; 

export async function executeCode(code: string, languageId: number): Promise<any> {
  try {
 
    const submitResponse = await fetch(JUDGE0_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(JUDGE0_API_KEY && { "X-Auth-Token": JUDGE0_API_KEY }),
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: "",
      }),
    });

    if (!submitResponse.ok) {
      throw new Error(`Judge0 submission failed: ${submitResponse.statusText}`);
    }

    const { token } = await submitResponse.json();
    if (!token) {
      throw new Error("No submission token returned from Judge0");
    }


    let result;
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      const resultResponse = await fetch(`${JUDGE0_API_URL}/${token}?base64_encoded=false`);
      if (!resultResponse.ok) {
        throw new Error(`Judge0 result fetch failed: ${resultResponse.statusText}`);
      }

      result = await resultResponse.json();
      if (result.status.id !== 1 && result.status.id !== 2) break; 
    }

    if (!result) {
      throw new Error("Failed to retrieve execution result from Judge0");
    }

    logger.info("Code execution result retrieved", { token, status: result.status.description });
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error("Failed to execute code with Judge0", { error: errorMessage });
    throw error;
  }
}