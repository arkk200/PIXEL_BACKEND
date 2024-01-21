import * as crypto from "crypto";
import { waitingRooms } from "../../state";
import { Listener, PlayerCount } from "../../types";
import { isJoinedQuickJoinWaitingRoom } from "../../utils";

type Data = { playerCount: PlayerCount; playerName: string };

const createRoomListener: Listener = (io, socket) => {
  socket.on("createRoom", ({ playerCount, playerName }: Data) => {
    // 빠른 참가 대기방에 들어가 있는 상태라면
    if (isJoinedQuickJoinWaitingRoom(socket.id)) {
      return;
    }

    // 방 만들고
    const roomID = crypto.randomUUID();

    // 방에 참가시키고
    socket.join(roomID);

    // 대기방 데이터 초기화하기
    waitingRooms[roomID] = {
      playerCount,
      waitingPlayerList: [{ socketID: socket.id, playerName }],
    };

    socket.emit("createRoom", {
      roomID,
      playerCount,
      playerList: waitingRooms[roomID]!.waitingPlayerList,
    });
  });
};

export default createRoomListener;
