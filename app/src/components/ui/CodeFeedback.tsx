"use client";
import { useState } from "react";
import Button from "../common/Button";
import { logger } from "../../lib/helpers/logger";
import { ExecuteResponse } from "../../types";

export default function CodeFeedback() {
  const [code, setCode] = useState<string>("");
  const [feedback, setFeedback] = useState<ExecuteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setFeedback(null);

      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: "python" }),
      });

      if (!response.ok) {
        throw new Error(`Failed to execute code: ${response.statusText}`);
      }

      const data: ExecuteResponse = await response.json();
      setFeedback(data);
      logger.info("Code execution completed", { status: data.status });
    } catch (err) {
      setError("Failed to execute code. Please try again.");
      logger.error("Error executing code", {
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <h2 className="text-md font-semibold mb-2">Code Feedback</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Running..." : "Run Code"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {feedback && (
        <div className="mt-2">
          <p>
            <strong>Status:</strong> {feedback.status}
          </p>
          {feedback.output && (
            <p>
              <strong>Output:</strong> {feedback.output}
            </p>
          )}
          {feedback.error && (
            <p className="text-red-500">
              <strong>Error:</strong> {feedback.error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
