import { UUID } from "crypto";
import { Socket } from "socket.io";
import { gamesData } from "../state";

const isPlayerTurn = (socketID: Socket["id"], roomID: UUID) => {
  const { whoseTurn, playerList } = gamesData[roomID];

  return socketID === playerList[whoseTurn].socketID;
};

export default isPlayerTurn;
