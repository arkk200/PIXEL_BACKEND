import { UUID } from "crypto";
import { Server, Socket } from "socket.io";

export const getRoomIDBySocket = (io: Server, socket: Socket) => {
  const rooms = io.sockets.adapter.sids.get(socket.id);
  if (!rooms) return null;
  return Array.from(rooms as Set<UUID>).filter(
    (roomID) => roomID !== socket.id
  )[0];
};
