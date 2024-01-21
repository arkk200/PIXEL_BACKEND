import { Server, Socket } from "socket.io";
import { Tuple } from "../types/utility";

export type Listener = (io: Server, socket: Socket) => void;

export type PlayerCount = 2 | 3 | 4;

export type RoomData = {
  playerCount: number;
  waitingPlayerList: WaitingPlayer[];
};

export type WaitingPlayer = {
  socketID: Socket["id"];
  playerName: string;
};

export type Player = {
  socketID: Socket["id"];
  playerName: string;
  remainSeconds: number;
};

export type GameData = {
  topSlider: { progress: number; prevProgress: number };
  sideSlider: { progress: number; prevProgress: number };
  board: Tuple<Tuple<-2 | -1 | 0 | 1 | 2 | 3, 8>, 8>;
  playerList: Player[];
  whoseTurn: 0 | 1 | 2 | 3;
  isGameEnd: boolean;
};
