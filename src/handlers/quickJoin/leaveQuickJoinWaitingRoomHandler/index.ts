import { Handler } from "../../types";
import { leaveQuickJoinWaitingRoom } from "../../utils";

// 빠른 참가 모달에서 벗어났을 경우
const leaveQuickJoinHandler: Handler = (io, socket) => {
  socket.on("leaveQuickJoin", () => {
    leaveQuickJoinWaitingRoom(socket.id);
  });
};

export default leaveQuickJoinHandler;
