import { SliderIndex } from "../";
import { GameData } from "../../../types";

const checkWinByBlocked = (
  gamesData: GameData,
  x: SliderIndex,
  y: SliderIndex
) => {
  const { board, playerList } = gamesData;
  // 놓을 수 있는 공간이 있다면 false 반환하기
  /// 가로
  for (let i = 0; i < 8; i++) {
    if (board[x]?.[i] != null && board[x][i] === -1) return false;
  }
  /// 세로
  for (let i = 0; i < 8; i++) {
    if (board[i]?.[y] != null && board[i][y] === -1) return false;
  }

  return true;
};

export default checkWinByBlocked;
