import { GAME_OVER_REASON } from "../../constants";
import { alreadyJoinedQuickJoinWaitingRoom } from "../quickJoinHandler/utils";
import { quickJoinWaitingRoom } from "../state";
import { Handler } from "../types";
import { getRoomIDBySocket } from "../utils";

// 연결이 끊겼는데
const disconnectingHandler: Handler = (io, socket) => {
  socket.on("disconnecting", () => {
    // 만약 빠른 참가를 기다리는 중일 때
    if (alreadyJoinedQuickJoinWaitingRoom(socket.id)) {
      // 모든 대기 방에서 소켓 아이디 제거
      for (const playerCount of [2, 3, 4] as const) {
        quickJoinWaitingRoom[playerCount] = quickJoinWaitingRoom[
          playerCount
        ].filter((waitingPlayer) => waitingPlayer.socketID !== socket.id);
      }
      return;
    }

    // 이미 게임에 참가 중일 때
    const roomID = getRoomIDBySocket(io, socket);
    if (!roomID) return;
    // 참가된 방에 게임이 끝났다고 알리고
    socket.to(roomID).emit("gameOver", {
      reason: GAME_OVER_REASON.SOMEONE_DISCONNECTED,
      winner: null,
    });
    // 방 폭파하기
    io.in(roomID).socketsLeave(roomID);
  });
};

export default disconnectingHandler;
