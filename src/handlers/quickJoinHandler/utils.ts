import { quickJoinPlayerWaitingRoom } from "../state";

export const alreadyJoined = (socketID: string) =>
  quickJoinPlayerWaitingRoom[2].some(
    (waitingRoom) => waitingRoom.socketID === socketID
  ) ||
  quickJoinPlayerWaitingRoom[3].some(
    (waitingRoom) => waitingRoom.socketID === socketID
  ) ||
  quickJoinPlayerWaitingRoom[4].some(
    (waitingRoom) => waitingRoom.socketID === socketID
  );
