import { Socket } from "socket.io";
import { WaitingPlayer } from "../types";

/**
 * 어떤 대기방에 플레이어가 들어있는지 값을 반환한다.
 * @param waitingPlayerList 대기방 플레이어 리스트
 * @param socketID 소켓 아이디
 * @returns 대기방 참가 유무 불린 값
 */
const isPlayerInWaitingPlayerList = (
  waitingPlayerList: WaitingPlayer[],
  socketID: Socket["id"]
) => {
  return waitingPlayerList.some((player) => player.socketID === socketID);
};

export default isPlayerInWaitingPlayerList;
