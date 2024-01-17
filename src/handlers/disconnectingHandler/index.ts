import { waitingRooms } from "../state";
import { Handler } from "../types";
import { getRoomIDBySocket, leaveQuickJoinWaitingRoom } from "../utils";
import isPlayerInWaitingPlayerList from "../utils/isPlayerInWaitingPlayerList";

// 연결이 끊겼는데
const disconnectingHandler: Handler = (io, socket) => {
  socket.on("disconnecting", () => {
    // 빠른 참가 대기방에서 기다리고 있었다면 내보내기
    leaveQuickJoinWaitingRoom(socket.id);

    const roomID = getRoomIDBySocket(io, socket);
    if (!roomID) return;

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
        return;
      }

      socket
        .to(roomID)
        .emit("updateRoom", { playerList: roomData.waitingPlayerList });
      return;
    }

    console.log("asf");

    // 이미 게임에 참가 중일 때

    // 참가된 방에 게임이 끝났다고 알리고
    socket.to(roomID).emit("gameOver:disconnecting");

    // 방 폭파하기
    io.in(roomID).socketsLeave(roomID);
  });
};

export default disconnectingHandler;
