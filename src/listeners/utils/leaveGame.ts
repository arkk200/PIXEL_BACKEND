import { Server, Socket } from "socket.io";
import getRoomIDBySocket from "./getRoomIDBySocket";

/**
 * 플레이어를 게임에서 떠나게 한다.
 * @param io 소켓 서버
 * @param socket 소켓
 */
const leaveGame = (io: Server, socket: Socket) => {
  const roomID = getRoomIDBySocket(io, socket);
  if (!roomID) return;

  socket.to(roomID).emit("gameOver:disconnecting");

  // 방 폭파하기
  io.in(roomID).socketsLeave(roomID);
};

export default leaveGame;
