import type { Express } from "express";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import disconnectingHandler from "./handlers/disconnectingHandler";
import quickJoinHandler from "./handlers/quickJoinHandler";

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

const port = 8080;

io.on("connection", (socket) => {
  console.log("a user connected");

  quickJoinHandler(io, socket);
  disconnectingHandler(io, socket);
});

server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});