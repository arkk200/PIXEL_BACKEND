import type { UUID } from "crypto";
import { Server } from "socket.io";
import { countDownIntervalIDs, gamesData } from "../state";

/**
 * 게임방에서 순서가 온 플레이어의 남은 시간을 카운트 다운한다.
 * @param io 소켓 서버
 * @param roomID 플레이어가 참가한 게임방 아이디
 */
const countDownRemainSeconds = (io: Server, roomID: UUID) => {
  clearInterval(countDownIntervalIDs[roomID]);

  countDownIntervalIDs[roomID] = setInterval(() => {
    const { playerList, whoseTurn } = gamesData[roomID];
    playerList[whoseTurn].remainSeconds--;

    io.to(roomID).emit("updateGame", gamesData[roomID]);

    // 만약 현재 플레이어의 남은 시간이 0초라면
    if (playerList[whoseTurn].remainSeconds === 0) {
      clearInterval(countDownIntervalIDs[roomID]);
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
