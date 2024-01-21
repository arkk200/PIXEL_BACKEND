import { Socket } from "socket.io";
import { quickJoinWaitingRoom } from "../state";
import isJoinedQuickJoinWaitingRoom from "./isJoinedQuickJoinWaitingRoom";

/**
 * 플레이어를 빠른 참가 대기방에서 떠나게한다.
 * @param socketID 소켓 아이디
 */
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
