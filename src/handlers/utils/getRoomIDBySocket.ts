import type { UUID } from "crypto";
import { Server, Socket } from "socket.io";

/**
 * 소켓을 통해 플레이어가 참가한 방 아이디를 반환한다.
 * @param io 소켓 서버
 * @param socket 소켓
 * @returns 플레이어가 참가하고 있는 방 아이디
 */
const getRoomIDBySocket = (io: Server, socket: Socket) => {
  const rooms = io.sockets.adapter.sids.get(socket.id);
  if (!rooms) return null;
  return Array.from(rooms as Set<UUID>).filter(
    (roomID) => roomID !== socket.id
  )[0];
};

export default getRoomIDBySocket;
