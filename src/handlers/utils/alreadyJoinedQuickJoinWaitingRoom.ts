import { quickJoinWaitingRoom } from "../state";

export const alreadyJoinedQuickJoinWaitingRoom = (socketID: string) =>
  quickJoinWaitingRoom[2].some(
    (waitingRoom) => waitingRoom.socketID === socketID
  ) ||
  quickJoinWaitingRoom[3].some(
    (waitingRoom) => waitingRoom.socketID === socketID
  ) ||
  quickJoinWaitingRoom[4].some(
    (waitingRoom) => waitingRoom.socketID === socketID
  );
