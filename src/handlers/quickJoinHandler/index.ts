import {
  countDownIntervalIDs,
  gamesData,
  initialGameData,
  quickJoinPlayerWaitingRoom,
} from "../state";
import type { Handler, PlayerCount } from "../types";
import { alreadyJoined } from "./utils";

type Data = { playerCount: PlayerCount; playerName: string };

const quickJoinHandler: Handler = (io, socket) => {
  socket.on("quickJoin", (data: Data) => {
    // 만약 이미 참가 상태라면
    if (alreadyJoined(socket.id)) {
      return; // 실행 무시하기
    }

    const { playerCount, playerName } = data;

    const playerList = quickJoinPlayerWaitingRoom[playerCount];
    playerList.push({ socketID: socket.id, playerName });

    // 만약 플레이어 n명이 들어갈 수 있는 방에 n명이 다 찼다면
    if (playerList.length === playerCount) {
      // 방 만들고 모든 플레이어 참가시키기
      const roomId = crypto.randomUUID();

      playerList.forEach((player) => {
        io.sockets.sockets.get(player.socketID)?.join(roomId);
      });

      gamesData[roomId] = structuredClone(initialGameData); // 초기 게임 데이터 복사
      gamesData[roomId].playerList = playerList.map((player) => ({
        ...player,
        remainSeconds: 1500,
      }));

      quickJoinPlayerWaitingRoom[playerCount] = [];

      // 플레이어 수에 따라 보드에 기본 목 놓기
      const { board } = gamesData[roomId];
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

      console.log(gamesData[roomId]);

      // 게임 시작을 알리기
      io.sockets.in(roomId).emit("startGame", gamesData[roomId]);

      // 1초 마다 게임 데이터를 전달함
      countDownIntervalIDs[roomId] = setInterval(() => {
        io.to(roomId).emit("updateGame", gamesData[roomId]);
      }, 1000);
    }
  });
};

export default quickJoinHandler;
