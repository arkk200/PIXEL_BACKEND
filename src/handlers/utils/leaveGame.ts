import { Server, Socket } from "socket.io";
import getRoomIDBySocket from "./getRoomIDBySocket";

const leaveGame = (io: Server, socket: Socket) => {
  const roomID = getRoomIDBySocket(io, socket);
  if (!roomID) return;

  socket.to(roomID).emit("gameOver:disconnecting");

  // 방 폭파하기
  io.in(roomID).socketsLeave(roomID);
};

export default leaveGame;
