import { Listener } from "../../types";
import { leaveGame } from "../../utils";

const leaveGameListener: Listener = (io, socket) => {
  socket.on("leaveGame", () => {
    leaveGame(io, socket);
  });
};

export default leaveGameListener;
