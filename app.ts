import type { Express } from "express";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Express = express();
const server = createServer(app);
const io = new Server(server);

const port = 8080;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
