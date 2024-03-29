import * as crypto from "crypto";
import { quickJoinWaitingRoom } from "../../state";
import type { Listener, PlayerCount } from "../../types";
import { isJoinedQuickJoinWaitingRoom, startGame } from "../../utils";

type Data = { playerCount: PlayerCount; playerName: string };

const quickJoinListener: Listener = (io, socket) => {
  socket.on("quickJoin", ({ playerCount, playerName }: Data) => {
    // 만약 이미 참가 상태라면
    if (isJoinedQuickJoinWaitingRoom(socket.id)) {
      return; // 실행 무시하기
    }

    const playerList = quickJoinWaitingRoom[playerCount];
    playerList.push({ socketID: socket.id, playerName });

    // 만약 플레이어 n명이 들어갈 수 있는 방에 n명이 다 찼다면
    if (playerList.length === playerCount) {
      // 방 만들고 모든 플레이어 참가시키기
      const roomID = crypto.randomUUID();

      quickJoinWaitingRoom[playerCount] = [];

      playerList.forEach((player) => {
        io.sockets.sockets.get(player.socketID)?.join(roomID);
      });

      startGame(io, roomID, playerCount, playerList);
    }
  });
};

export default quickJoinListener;
