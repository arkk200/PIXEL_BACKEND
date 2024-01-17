import { quickJoinWaitingRoom } from "../state";
import isPlayerInWaitingPlayerList from "./isPlayerInWaitingPlayerList";

const isJoinedQuickJoinWaitingRoom = (socketID: string) => {
  return (
    isPlayerInWaitingPlayerList(quickJoinWaitingRoom[2], socketID) ||
    isPlayerInWaitingPlayerList(quickJoinWaitingRoom[3], socketID) ||
    isPlayerInWaitingPlayerList(quickJoinWaitingRoom[3], socketID)
  );
};
export default isJoinedQuickJoinWaitingRoom;
