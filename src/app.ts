import type { Express } from "express";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createRoomHandler,
  disconnectingHandler,
  joinRoomHandler,
  leaveQuickJoinWaitingRoomHandler,
  moveSliderHandler,
  placeMokHandler,
  quickJoinHandler,
} from "./handlers";

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

const port = 8080;

io.on("connection", (socket) => {
  quickJoinHandler(io, socket);
  leaveQuickJoinWaitingRoomHandler(io, socket);
  createRoomHandler(io, socket);
  moveSliderHandler(io, socket);
  placeMokHandler(io, socket);
  disconnectingHandler(io, socket);
  joinRoomHandler(io, socket);
});

server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
