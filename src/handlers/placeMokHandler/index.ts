import { countDownIntervalIDs, gamesData } from "../state";
import { GameData, Handler } from "../types";
import { getRoomIDBySocket, isPlayerTurn } from "../utils";

type SliderIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Data = { topSliderIndex: SliderIndex; sideSliderIndex: SliderIndex };

const placeMokHandler: Handler = (io, socket) => {
  socket.on("placeMok", ({ topSliderIndex, sideSliderIndex }: Data) => {
    const roomID = getRoomIDBySocket(io, socket);
    if (!roomID) return;

    if (!isPlayerTurn(socket.id, roomID)) return;

    const { board, whoseTurn, topSlider, sideSlider, playerList } =
      gamesData[roomID];

    // 이미 board에 목이 있다면 실행 못하게 막기
    if (board[sideSliderIndex][topSliderIndex] !== -1) return;

    // board에 목 추가하기
    board[sideSliderIndex][topSliderIndex] = whoseTurn;

    // 슬라이더 prevProgress 값 바꾸기
    topSlider.prevProgress = topSlider.progress;
    sideSlider.prevProgress = sideSlider.progress;

    // 순서 한 차례 이동하기
    gamesData[roomID].whoseTurn = ((whoseTurn + 1) %
      playerList.length) as GameData["whoseTurn"];

    console.log(gamesData[roomID]);

    io.to(roomID).emit("updateGame", gamesData[roomID]);

    // 초 시계 다시 맞추기
    clearInterval(countDownIntervalIDs[roomID]);

    countDownIntervalIDs[roomID] = setInterval(() => {
      const { playerList, whoseTurn } = gamesData[roomID];
      playerList[whoseTurn].remainSeconds--;

      io.to(roomID).emit("updateGame", gamesData[roomID]);
    }, 1000);
  });
};

export default placeMokHandler;
