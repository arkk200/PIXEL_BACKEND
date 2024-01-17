import { waitingRooms } from "../state";
import { Handler, PlayerCount } from "../types";
import { getRoomIDBySocket, startGame } from "../utils";

const startGameHandler: Handler = (io, socket) => {
  socket.on("startGame", () => {
    const roomID = getRoomIDBySocket(io, socket);
    if (!roomID) return;

    // 만약 게임을 시작한게 호스트가 아니라면
    const roomData = waitingRooms[roomID];
    if (!roomData) return;

    if (roomData.waitingPlayerList[0].socketID !== socket.id) return;

    // 그렇지 않다면 게임 데이터 세팅하기
    const playerCount = roomData.waitingPlayerList.length as PlayerCount; // 현재 대기 중인 플레이어 수를 받고
    const playerList = roomData.waitingPlayerList;

    startGame(io, roomID, playerCount, playerList);

    // 대기방 폭파하기
    delete waitingRooms[roomID];
  });
};

export default startGameHandler;
