import { commonWaitingRoom } from "../state";
import { Handler, PlayerCount } from "../types";
import { alreadyJoinedQuickJoinWaitingRoom } from "../utils/alreadyJoinedQuickJoinWaitingRoom";

type Data = { playerCount: PlayerCount; playerName: string };

const createRoomHandler: Handler = (io, socket) => {
  socket.on("createRoom", ({ playerCount, playerName }: Data) => {
    // 빠른 참가 대기방에 들어가 있는 상태라면
    if (alreadyJoinedQuickJoinWaitingRoom(socket.id)) {
      return;
    }

    // 방 만들고
    const roomID = crypto.randomUUID();

    socket.join(roomID);

    const roomList = commonWaitingRoom[playerCount];

    roomList[roomID] = [{ socketID: socket.id, playerName }];

    socket.emit("createRoom", {
      roomID,
      playerCount,
      playerList: roomList[roomID],
    });
  });
};

export default createRoomHandler;
