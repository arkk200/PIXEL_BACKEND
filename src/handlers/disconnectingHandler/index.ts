import { Handler } from "../types";
import { getRoomIDBySocket, leaveQuickJoinWaitingRoom } from "../utils";

// 연결이 끊겼는데
const disconnectingHandler: Handler = (io, socket) => {
  socket.on("disconnecting", () => {
    // 빠른 참가 대기방에서 기다리고 있었다면 내보내기
    leaveQuickJoinWaitingRoom(socket.id);

    // 이미 게임에 참가 중일 때
    const roomID = getRoomIDBySocket(io, socket);
    if (!roomID) return;

    // 참가된 방에 게임이 끝났다고 알리고
    socket.to(roomID).emit("gameOver:disconnecting");

    // 방 폭파하기
    io.in(roomID).socketsLeave(roomID);
  });
};

export default disconnectingHandler;
