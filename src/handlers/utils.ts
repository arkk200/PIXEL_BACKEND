import { UUID } from "crypto";
import { Server, Socket } from "socket.io";
import { countDownIntervalIDs, gamesData } from "./state";

export const getRoomIDBySocket = (io: Server, socket: Socket) => {
  const rooms = io.sockets.adapter.sids.get(socket.id);
  if (!rooms) return null;
  return Array.from(rooms as Set<UUID>).filter(
    (roomID) => roomID !== socket.id
  )[0];
};

export const isPlayerTurn = (socketID: Socket["id"], roomID: UUID) => {
  const { whoseTurn, playerList } = gamesData[roomID];

  return socketID === playerList[whoseTurn].socketID;
};

export const countDownRemainTime = (io: Server, roomID: UUID) => {
  clearInterval(countDownIntervalIDs[roomID]);

  countDownIntervalIDs[roomID] = setInterval(() => {
    const { playerList, whoseTurn } = gamesData[roomID];
    playerList[whoseTurn].remainSeconds--;

    io.to(roomID).emit("updateGame", gamesData[roomID]);
  }, 1000);
};
