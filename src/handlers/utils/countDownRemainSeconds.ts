import { UUID } from "crypto";
import { Server } from "socket.io";
import { countDownIntervalIDs, gamesData } from "../state";

const countDownRemainSeconds = (io: Server, roomID: UUID) => {
  clearInterval(countDownIntervalIDs[roomID]);

  countDownIntervalIDs[roomID] = setInterval(() => {
    const { playerList, whoseTurn } = gamesData[roomID];
    playerList[whoseTurn].remainSeconds--;

    io.to(roomID).emit("updateGame", gamesData[roomID]);

    // 만약 현재 플레이어의 남은 시간이 0초라면
    if (playerList[whoseTurn].remainSeconds === 0) {
      const { remainSeconds, ...player } = playerList[whoseTurn];

      // 졌다는 거 알리기
      io.to(roomID).emit("gameOver:lose", {
        losePlayerName: player.playerName,
        whoseTurn,
      });

      // 방에서 다 내보내기
      io.in(roomID).socketsLeave(roomID);
    }
  }, 1000);
};

export default countDownRemainSeconds;
