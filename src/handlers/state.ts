import { UUID } from "crypto";
import { INITIAL_SLIDER_PROGRESS } from "../constants";
import { GameData, PlayerCount, WaitingPlayer } from "./types";

export const quickJoinPlayerWaitingRoom: Record<PlayerCount, WaitingPlayer[]> =
  {
    2: [],
    3: [],
    4: [],
  };

export const gamesData: Record<UUID, GameData> = {};
export const countDownIntervalIDs: Record<UUID, NodeJS.Timeout> = {};

export const initialGameData: Readonly<GameData> = {
  topSlider: {
    progress: INITIAL_SLIDER_PROGRESS,
    prevProgress: INITIAL_SLIDER_PROGRESS,
  },
  sideSlider: {
    progress: INITIAL_SLIDER_PROGRESS,
    prevProgress: INITIAL_SLIDER_PROGRESS,
  },
  board: [
    [-2, -1, -1, -1, -1, -1, -1, -2],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-2, -1, -1, -1, -1, -1, -1, -2],
  ],
  playerList: [],
  whoseTurn: 0,
};
