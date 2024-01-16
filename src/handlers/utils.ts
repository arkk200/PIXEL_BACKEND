import { UUID } from "crypto";
import { Server, Socket } from "socket.io";
import { gamesData } from "./state";

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
