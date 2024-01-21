import { SliderIndex } from ".";
import { GameData } from "../../types";

const checkWinBy4mok = (
  board: GameData["board"],
  x: SliderIndex,
  y: SliderIndex,
  whoseTurn: GameData["whoseTurn"]
) => {
  let mokCount = 1;
  // 가로
  /// 오른쪽 방향으로
  for (let i = y + 1; board[x]?.[i] === whoseTurn; i++) mokCount++;
  /// 왼쪽 방향으로
  for (let i = y - 1; board[x]?.[i] === whoseTurn; i--) mokCount++;
  if (mokCount === 4) return true;

  mokCount = 1;
  // 세로
  /// 아래쪽 방향으로
  for (let i = x + 1; board[i]?.[y] === whoseTurn; i++) mokCount++;
  /// 위쪽 방향으로
  for (let i = x - 1; board[i]?.[y] === whoseTurn; i--) mokCount++;
  if (mokCount === 4) return true;

  mokCount = 1;
  // 대각선 1
  /// 우하향으로
  for (let i = x + 1, j = y + 1; board[i]?.[j] === whoseTurn; i++, j++)
    mokCount++;
  /// 좌상향으로
  for (let i = x - 1, j = y - 1; board[i]?.[j] === whoseTurn; i--, j--)
    mokCount++;
  if (mokCount === 4) return true;

  mokCount = 1;
  // 대각선 2
  /// 우상향으로
  for (let i = x - 1, j = y + 1; board[i]?.[j] === whoseTurn; i--, j++)
    mokCount++;
  /// 좌하향으로
  for (let i = x + 1, j = y - 1; board[i]?.[j] === whoseTurn; i++, j--)
    mokCount++;
  if (mokCount === 4) return true;

  return false;
};

export default checkWinBy4mok;
