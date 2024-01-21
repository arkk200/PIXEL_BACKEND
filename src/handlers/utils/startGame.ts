import type { UUID } from "crypto";
import { Server } from "socket.io";
import { INITIAL_REMAIN_SECONDS } from "../../constants";
import { gamesData, initialGameData } from "../state";
import { PlayerCount, WaitingPlayer } from "../types";
import countDownRemainSeconds from "./countDownRemainSeconds";

/**
 * 게임을 시작한다.
 * @param io 소켓 서버
 * @param roomID 플레이어가 들어가있는 방 아이디
 * @param playerCount 플레이하는 플레이어 수
 * @param playerList 플레이하는 플레이어 리스트
 */
const startGame = (
  io: Server,
  roomID: UUID,
  playerCount: PlayerCount,
  playerList: WaitingPlayer[]
) => {
  gamesData[roomID] = structuredClone(initialGameData); // 초기 게임 데이터 복사
  gamesData[roomID].playerList = playerList.map((player) => ({
    ...player,
    remainSeconds: INITIAL_REMAIN_SECONDS,
  }));

  // 플레이어 수에 따라 보드에 기본 목 놓기
  const { board } = gamesData[roomID];
  if (playerCount === 2) {
    board[3][3] = 0;
    board[4][4] = 1;
  }
  if (playerCount === 3) {
    board[3][3] = 0;
    board[3][4] = 1;
    board[4][4] = 2;
  }
  if (playerCount === 4) {
    board[3][3] = 0;
    board[3][4] = 1;
    board[4][4] = 2;
    board[4][3] = 3;
  }

  // 게임 시작을 알리기
  io.sockets.in(roomID).emit("startGame", gamesData[roomID]);

  // 1초 마다 게임 데이터를 전달함
  countDownRemainSeconds(io, roomID);
};

export default startGame;
