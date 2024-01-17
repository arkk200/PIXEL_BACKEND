import { Server, Socket } from "socket.io";
import { waitingRooms } from "../state";
import getRoomIDBySocket from "./getRoomIDBySocket";
import isPlayerInWaitingPlayerList from "./isPlayerInWaitingPlayerList";

const leaveWaitingRoom = (io: Server, socket: Socket) => {
  const roomID = getRoomIDBySocket(io, socket);
  if (!roomID) return { success: false };

  // 대기방에서 기다리고 있었다면
  const roomData = waitingRooms[roomID];

  if (
    roomData &&
    isPlayerInWaitingPlayerList(roomData.waitingPlayerList, socket.id)
  ) {
    console.log("who disconnected");
    const { waitingPlayerList } = roomData;

    roomData.waitingPlayerList = waitingPlayerList.filter(
      (player) => player.socketID !== socket.id
    );

    // 만약 대기방에 남아있는 인원이 없다면 폭파하기
    if (roomData.waitingPlayerList.length === 0) {
      delete waitingRooms[roomID];
      return { success: true };
    }

    socket
      .to(roomID)
      .emit("updateRoom", { playerList: roomData.waitingPlayerList });
    return { success: true };
  }
  return { success: false };
};

export default leaveWaitingRoom;
