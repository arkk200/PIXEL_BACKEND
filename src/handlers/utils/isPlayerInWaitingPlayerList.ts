import { Socket } from "socket.io";
import { WaitingPlayer } from "../types";

const isPlayerInWaitingPlayerList = (
  waitingPlayerList: WaitingPlayer[],
  socketID: Socket["id"]
) => {
  return waitingPlayerList.some((player) => player.socketID === socketID);
};

export default isPlayerInWaitingPlayerList;
