import type { UUID } from "crypto";
import { waitingRooms } from "../../state";
import { Listener } from "../../types";

type Data = { roomID: UUID; playerName: string };

const joinRoomListener: Listener = (io, socket) => {
  socket.on("joinRoom", ({ roomID, playerName }: Data) => {
    const roomData = waitingRooms[roomID];
    // 방이 존재하지 않으면
    if (!roomData) return;

    const { playerCount, waitingPlayerList } = roomData;

    // 만약 방이 대기방이 꽉 찼다면
    if (playerCount === waitingPlayerList.length) return;

    // 방에 참가시키고
    socket.join(roomID);

    // 대기방에 플레이어 추가시키기
    waitingPlayerList.push({
      socketID: socket.id,
      playerName,
    });

    socket.emit("joinRoom", {
      roomID,
      playerCount,
      playerList: waitingPlayerList,
    });

    socket.to(roomID).emit("updateRoom", {
      playerList: waitingPlayerList,
    });
  });
};

export default joinRoomListener;
