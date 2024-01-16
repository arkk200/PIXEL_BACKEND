import { UUID } from "crypto";
import { Server, Socket } from "socket.io";
import { GAME_OVER_MESSAGE } from "../constants";
import { countDownIntervalIDs, gamesData } from "./state";

export const getRoomIDBySocket = (io: Server, socket: Socket) => {
  const rooms = io.sockets.adapter.sids.get(socket.id);
  if (!rooms) return null;
  return Array.from(rooms as Set<UUID>).filter(
    (roomID) => roomID !== socket.id
  )[0];
};

export const isPlayerTurn = (socketID: Socket["id"], roomID: UUID) => {
  const { whoseTurn, playerList } = gamesData[roomID];

  return socketID === playerList[whoseTurn].socketID;
};

export const countDownRemainSeconds = (io: Server, roomID: UUID) => {
  clearInterval(countDownIntervalIDs[roomID]);

  countDownIntervalIDs[roomID] = setInterval(() => {
    const { playerList, whoseTurn } = gamesData[roomID];
    playerList[whoseTurn].remainSeconds--;

    io.to(roomID).emit("updateGame", gamesData[roomID]);

    // 만약 현재 플레이어의 남은 시간이 0초라면
    if (playerList[whoseTurn].remainSeconds === 0) {
      const { remainSeconds, ...player } = playerList[whoseTurn];

      // 졌다는 거 알리기
      io.to(roomID).emit("gameOver", {
        message: GAME_OVER_MESSAGE.SOMEONE_LOST,
        losePlayerName: player.playerName,
        whoseTurn,
      });

      // 방에서 다 내보내기
      io.in(roomID).socketsLeave(roomID);
    }
  }, 1000);
};
