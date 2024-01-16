import { Socket } from "socket.io";
import { alreadyJoinedQuickJoinWaitingRoom } from "../quickJoinHandler/utils";
import { quickJoinWaitingRoom } from "../state";

const leaveQuickJoinWaitingRoom = (socketID: Socket["id"]) => {
  if (alreadyJoinedQuickJoinWaitingRoom(socketID)) {
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
