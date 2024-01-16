import { GAME_OVER_REASON } from "../../constants";
import { alreadyJoinedQuickJoinWaitingRoom } from "../quickJoinHandler/utils";
import { quickJoinWaitingRoom } from "../state";
import { Handler } from "../types";

// 연결이 끊겼는데
const disconnectingHandler: Handler = (io, socket) => {
  socket.on("disconnecting", () => {
    // 만약 빠른 참가를 기다리는 중일 때
    if (alreadyJoinedQuickJoinWaitingRoom(socket.id)) {
      console.log("remove user from quick join waiting room");
      // 모든 대기 방에서 소켓 아이디 제거
      for (const playerCount of [2, 3, 4] as const) {
        quickJoinWaitingRoom[playerCount] = quickJoinWaitingRoom[
          playerCount
        ].filter((waitingPlayer) => waitingPlayer.socketID !== socket.id);
      }
      return;
    }

    // 이미 게임에 참가 중일 때
    const rooms = io.sockets.adapter.sids.get(socket.id);

    // 참가된 방(나를 제외한)에 게임이 끝났다고 알리고
    rooms?.forEach((roomID) => {
      if (roomID === socket.id) return;

      socket.to(roomID).emit("gameOver", {
        reason: GAME_OVER_REASON.SOMEONE_DISCONNECTED,
        winner: null,
      });

      // 방 폭파하기
      io.in(roomID).socketsLeave(roomID);
    });
  });
};

export default disconnectingHandler;
