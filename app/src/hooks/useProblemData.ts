import { useState, useEffect } from "react";
import { parseProblemTitle } from "../lib/helpers/problemParser";
import { logger } from "../lib/helpers/logger";

export function useProblemData() {
  const [problem, setProblem] = useState<string>("");

  useEffect(() => {
    try {
      const title = parseProblemTitle();
      setProblem(title);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error("Error fetching problem data", { error: errorMessage });
    }
  }, []);

  return { problem };
}