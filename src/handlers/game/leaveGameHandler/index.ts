import { Handler } from "../../types";
import { leaveGame } from "../../utils";

const leaveGameHandler: Handler = (io, socket) => {
  socket.on("leaveGame", () => {
    leaveGame(io, socket);
  });
};

export default leaveGameHandler;
