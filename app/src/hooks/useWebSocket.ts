import { useEffect, useRef } from "react";
import ioClient from "socket.io-client";
import { logger } from "../lib/helpers/logger";

export function useWebSocket() {
  const socketRef = useRef(ioClient());

  useEffect(() => {
    socketRef.current.connect();
    logger.info("WebSocket connected", { socketId: socketRef.current.id });

    socketRef.current.on("connect_error", (err: Error) => {
      logger.error("WebSocket connection error", { error: err.message });
    });

    return () => {
      socketRef.current.disconnect();
      logger.info("WebSocket disconnected", { socketId: socketRef.current.id });
    };
  }, []);

  return socketRef.current;
}