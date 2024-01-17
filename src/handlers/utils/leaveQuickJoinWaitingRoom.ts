import { Socket } from "socket.io";
import { quickJoinWaitingRoom } from "../state";
import isJoinedQuickJoinWaitingRoom from "./isJoinedQuickJoinWaitingRoom";

const leaveQuickJoinWaitingRoom = (socketID: Socket["id"]) => {
  if (isJoinedQuickJoinWaitingRoom(socketID)) {
    // 모든 대기 방에서 소켓 아이디 제거
    for (const playerCount of [2, 3, 4] as const) {
      quickJoinWaitingRoom[playerCount] = quickJoinWaitingRoom[
        playerCount
      ].filter((waitingPlayer) => waitingPlayer.socketID !== socketID);
    }
    return;
  }
};

export default leaveQuickJoinWaitingRoom;
