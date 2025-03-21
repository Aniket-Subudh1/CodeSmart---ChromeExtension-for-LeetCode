import { Server } from "socket.io";
import { createServer } from "http";
import { logger } from "../helpers/logger";


const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  logger.info("New WebSocket connection", { socketId: socket.id });

  socket.on("join", (problem: string) => {
    socket.join(problem);
    logger.info("User joined problem room", { problem, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    logger.info("WebSocket disconnected", { socketId: socket.id });
  });
});

export { io };