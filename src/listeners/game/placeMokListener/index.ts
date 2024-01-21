import { countDownIntervalIDs, gamesData } from "../../state";
import { GameData, Listener } from "../../types";
import {
  countDownRemainSeconds,
  getRoomIDBySocket,
  isPlayerTurn,
} from "../../utils";
import checkWinBy4mok from "./checkWinBy4mok";
import checkWinByBlocked from "./checkWinByBlocked";
import findWinPlayerList from "./checkWinByBlocked/findWinPlayerList";

export type SliderIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Data = {
  topSliderProgressIndex: SliderIndex;
  sideSliderProgressIndex: SliderIndex;
};

const placeMokListener: Listener = (io, socket) => {
  socket.on(
    "placeMok",
    ({ topSliderProgressIndex, sideSliderProgressIndex }: Data) => {
      const roomID = getRoomIDBySocket(io, socket);
      if (!roomID) return;

      if (!isPlayerTurn(socket.id, roomID)) return;

      const { board, whoseTurn, topSlider, sideSlider, playerList } =
        gamesData[roomID];

      // 이미 board에 목이 있다면 실행 못하게 막기
      if (board[sideSliderProgressIndex][topSliderProgressIndex] !== -1) return;

      // board에 목 추가하기
      board[sideSliderProgressIndex][topSliderProgressIndex] = whoseTurn;

      // 슬라이더 prevProgress 값 바꾸기
      topSlider.prevProgress = topSlider.progress;
      sideSlider.prevProgress = sideSlider.progress;

      // 순서 한 차례 이동하기
      gamesData[roomID].whoseTurn = ((whoseTurn + 1) %
        playerList.length) as GameData["whoseTurn"];

      io.to(roomID).emit("updateGame", gamesData[roomID]);

      // 게임이 끝났는지 검사하기
      let isGameOver;
      /// 4목
      isGameOver = checkWinBy4mok(
        board,
        sideSliderProgressIndex,
        topSliderProgressIndex,
        whoseTurn
      );

      if (isGameOver) {
        io.to(roomID).emit("gameOver:4mokWin", {
          winPlayerName: playerList[whoseTurn].playerName,
          whoseTurn,
        });
        clearInterval(countDownIntervalIDs[roomID]);
        return;
      }

      /// 놓을 대가 없을 때
      isGameOver = checkWinByBlocked(
        gamesData[roomID],
        sideSliderProgressIndex,
        topSliderProgressIndex
      );

      if (isGameOver) {
        const winPlayerList = findWinPlayerList(gamesData[roomID]);
        io.to(roomID).emit("gameOver:blocked", {
          winPlayerList,
        });
        clearInterval(countDownIntervalIDs[roomID]);
        return;
      }

      // 초 시계 다시 맞추기
      countDownRemainSeconds(io, roomID);
    }
  );
};

export default placeMokListener;
