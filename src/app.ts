import type { Express } from "express";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createRoomListener,
  disconnectingListener,
  joinRoomListener,
  leaveGameListener,
  leaveQuickJoinWaitingRoomListener,
  leaveRoomListener,
  moveSliderListener,
  placeMokListener,
  quickJoinListener,
  startGameListener,
} from "./listeners";

const app: Express = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL!,
    ],
  },
});

const port = 8080;

io.on("connection", (socket) => {
  quickJoinListener(io, socket);
  leaveQuickJoinWaitingRoomListener(io, socket);

  createRoomListener(io, socket);
  joinRoomListener(io, socket);
  leaveRoomListener(io, socket);
  startGameListener(io, socket);

  moveSliderListener(io, socket);
  placeMokListener(io, socket);
  leaveGameListener(io, socket);
  disconnectingListener(io, socket);
});

server.listen(port, () => {
  console.log(`[server]: Server is running at https://121.174.55.140:${port}`);
});
