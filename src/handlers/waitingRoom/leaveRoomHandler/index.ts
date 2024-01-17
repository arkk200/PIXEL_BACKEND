import { Handler } from "../../types";
import { leaveWaitingRoom } from "../../utils";

const leaveRoomHandler: Handler = (io, socket) => {
  socket.on("leaveRoom", () => {
    leaveWaitingRoom(io, socket);
  });
};

export default leaveRoomHandler;
