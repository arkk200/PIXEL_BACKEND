import { gamesData } from "../state";
import { Handler } from "../types";
import { getRoomIDBySocket } from "../utils";

type Data = { sliderPosition: "TOP" | "SIDE"; progress: number };

const moveSliderHandler: Handler = (io, socket) => {
  socket.on("updateSlider", ({ sliderPosition, progress }: Data) => {
    const roomID = getRoomIDBySocket(io, socket);
    if (!roomID) return;

    const { topSlider, sideSlider, whoseTurn, playerList } = gamesData[roomID];

    // 자기 차례가 아니라면
    if (socket.id !== playerList[whoseTurn].socketID) return;

    if (sliderPosition === "TOP") {
      topSlider.progress = progress;
      sideSlider.progress = sideSlider.prevProgress;
    }

    if (sliderPosition === "SIDE") {
      sideSlider.progress = progress;
      topSlider.progress = topSlider.prevProgress;
    }

    io.to(roomID).emit("updateGame", gamesData[roomID]);
  });
};

export default moveSliderHandler;
