import { quickJoinWaitingRoom } from "../state";
import isPlayerInWaitingPlayerList from "./isPlayerInWaitingPlayerList";

/**
 * 빠른 참가 대기방에 플레이어가 들어있는지 값을 반환한다.
 * @param socketID 소켓 아이디
 * @returns 참가 유무 불린 값
 */
const isJoinedQuickJoinWaitingRoom = (socketID: string) => {
  return (
    isPlayerInWaitingPlayerList(quickJoinWaitingRoom[2], socketID) ||
    isPlayerInWaitingPlayerList(quickJoinWaitingRoom[3], socketID) ||
    isPlayerInWaitingPlayerList(quickJoinWaitingRoom[3], socketID)
  );
};
export default isJoinedQuickJoinWaitingRoom;
