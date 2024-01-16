import { INITIAL_REMAIN_SECONDS } from "../../constants";
import { gamesData, initialGameData, quickJoinWaitingRoom } from "../state";
import type { Handler, PlayerCount } from "../types";
import { countDownRemainSeconds } from "../utils";
import { alreadyJoinedQuickJoinWaitingRoom } from "./utils";

type Data = { playerCount: PlayerCount; playerName: string };

const quickJoinHandler: Handler = (io, socket) => {
  socket.on("quickJoin", ({ playerCount, playerName }: Data) => {
    // 만약 이미 참가 상태라면
    if (alreadyJoinedQuickJoinWaitingRoom(socket.id)) {
      return; // 실행 무시하기
    }

    const playerList = quickJoinWaitingRoom[playerCount];
    playerList.push({ socketID: socket.id, playerName });

    // 만약 플레이어 n명이 들어갈 수 있는 방에 n명이 다 찼다면
    if (playerList.length === playerCount) {
      // 방 만들고 모든 플레이어 참가시키기
      const roomID = crypto.randomUUID();

      playerList.forEach((player) => {
        io.sockets.sockets.get(player.socketID)?.join(roomID);
      });

      gamesData[roomID] = structuredClone(initialGameData); // 초기 게임 데이터 복사
      gamesData[roomID].playerList = playerList.map((player) => ({
        ...player,
        remainSeconds: INITIAL_REMAIN_SECONDS,
      }));

      quickJoinWaitingRoom[playerCount] = [];

      // 플레이어 수에 따라 보드에 기본 목 놓기
      const { board } = gamesData[roomID];
      if (playerCount === 2) {
        board[3][3] = 0;
        board[4][4] = 1;
      }
      if (playerCount === 3) {
        board[3][3] = 0;
        board[3][4] = 1;
        board[4][3] = 2;
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
    }
  });
};

export default quickJoinHandler;
