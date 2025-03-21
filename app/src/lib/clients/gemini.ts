import { logger } from "../helpers/logger";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = "https://api.gemini.com/v1/generate"; 

export async function getHint(problem: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    logger.error("Gemini API key not configured");
    throw new Error("Gemini API key not configured");
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Provide a subtle hint for solving the LeetCode problem "${problem}" without giving the full solution.`,
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const hint = data.choices?.[0]?.text?.trim() || "";
    if (!hint) {
      throw new Error("No hint returned from Gemini API");
    }

    return hint;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error("Failed to fetch hint from Gemini API", { problem, error: errorMessage });
    throw error;
  }
}