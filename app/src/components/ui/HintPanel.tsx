"use client";
import { useState, useEffect } from "react";
import { logger } from "../../lib/helpers/logger";
import { HintResponse } from "../../types";

export default function HintPanel() {
  const [hint, setHint] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHint = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/hints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ problem: "Two Sum" }), // Replace with dynamic problem name
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch hint: ${response.statusText}`);
        }

        const data: HintResponse = await response.json();
        setHint(data.hint);
        logger.info("Hint fetched successfully", {
          problem: "Two Sum",
          cached: data.cached,
        });
      } catch (err: unknown) {
        setError("Failed to load hint. Please try again.");
        logger.error("Error fetching hint", {
          error: err instanceof Error ? err.message : String(err),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHint();
  }, []);

  return (
    <div className="panel">
      <h2 className="text-md font-semibold mb-2">Hint</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {hint && <p>{hint}</p>}
    </div>
  );
}
