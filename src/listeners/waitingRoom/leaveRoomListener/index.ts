import { Listener } from "../../types";
import { leaveWaitingRoom } from "../../utils";

const leaveRoomListener: Listener = (io, socket) => {
  socket.on("leaveRoom", () => {
    leaveWaitingRoom(io, socket);
  });
};

export default leaveRoomListener;
