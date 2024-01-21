import type { UUID } from "crypto";
import { Socket } from "socket.io";
import { gamesData } from "../state";

/**
 * 플레이어가 참가 중인 게임에서 차례인지 불린 값을 반환한다.
 * @param socketID 클라이언트 소켓 아이디
 * @param roomID 플레이어가 참가한 게임방 아이디
 * @returns 플레이어 차례 여부 불린 값
 */
const isPlayerTurn = (socketID: Socket["id"], roomID: UUID) => {
  const { whoseTurn, playerList } = gamesData[roomID];

  return socketID === playerList[whoseTurn].socketID;
};

export default isPlayerTurn;
