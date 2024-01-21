import { Listener } from "../types";
import {
  leaveGame,
  leaveQuickJoinWaitingRoom,
  leaveWaitingRoom,
} from "../utils";

// 연결이 끊겼는데
const disconnectingListener: Listener = (io, socket) => {
  socket.on("disconnecting", () => {
    // 빠른 참가 대기방에서 기다리고 있었다면 내보내기
    leaveQuickJoinWaitingRoom(socket.id);

    const { success } = leaveWaitingRoom(io, socket);
    // 대기방에서 떠나기에 성공했다면
    if (success) return;

    // 하지 않았다면
    leaveGame(io, socket);
  });
};

export default disconnectingListener;
