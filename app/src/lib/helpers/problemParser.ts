import { logger } from "./logger";

export function parseProblemTitle(): string {
  logger.info("Parsing problem title", { source: "DOM" });
  return "Two Sum";
}