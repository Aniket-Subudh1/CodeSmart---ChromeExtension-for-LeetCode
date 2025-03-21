"use client";
import { useState, useEffect } from "react";
import { useWebSocket } from "../../hooks/useWebSocket";
import { logger } from "../../lib/helpers/logger";
import { ChatMessage } from "../../types";

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const socket = useWebSocket();

  useEffect(() => {
    // Join the problem room
    socket.emit("join", "Two Sum"); // Replace with dynamic problem name

    socket.on("chat", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      logger.info("New chat message received", {
        userId: msg.userId,
        message: msg.message,
      });
    });

    return () => {
      socket.off("chat");
    };
  }, [socket]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const message: ChatMessage = {
      userId: "user1", // Replace with actual user ID
      message: input,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/collab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: "Two Sum", ...message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setInput("");
    } catch (err) {
      logger.error("Error sending chat message", {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  return (
    <div className="panel">
      <h2 className="text-md font-semibold mb-2">Collaboration Chat</h2>
      <div className="h-40 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.userId}:</strong> {msg.message}{" "}
            <small>({new Date(msg.timestamp).toLocaleTimeString()})</small>
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-1 mr-2"
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
