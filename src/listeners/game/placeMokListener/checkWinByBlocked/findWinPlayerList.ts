import { GameData } from "../../../types";

const findWinPlayerList = (gameData: GameData) => {
  const { board, playerList } = gameData;

  // 3목이 가장 많은 플레이어 찾기
  const player3mokCountList: number[] = Array(playerList.length).fill(0);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i]?.[j] < 0) continue; // 목이 없다면

      // 가로
      if (
        board[i]?.[j] !== board[i]?.[j - 1] &&
        board[i]?.[j] === board[i]?.[j + 1] &&
        board[i]?.[j] === board[i]?.[j + 2] &&
        board[i]?.[j] !== board[i]?.[j + 3]
      )
        player3mokCountList[board[i][j]]++;
      // 세로
      if (
        board[i]?.[j] !== board[i - 1]?.[j] &&
        board[i]?.[j] === board[i + 1]?.[j] &&
        board[i]?.[j] === board[i + 2]?.[j] &&
        board[i]?.[j] !== board[i + 3]?.[j]
      )
        player3mokCountList[board[i][j]]++;
      // 대각선 1
      if (
        board[i]?.[j] !== board[i - 1]?.[j - 1] &&
        board[i]?.[j] === board[i + 1]?.[j + 1] &&
        board[i]?.[j] === board[i + 2]?.[j + 2] &&
        board[i]?.[j] !== board[i + 3]?.[j + 3]
      )
        player3mokCountList[board[i][j]]++;
      // 대각선 2
      if (
        board[i]?.[j] !== board[i - 1]?.[j + 1] &&
        board[i]?.[j] === board[i + 1]?.[j - 1] &&
        board[i]?.[j] === board[i + 2]?.[j - 2] &&
        board[i]?.[j] !== board[i + 3]?.[j - 3]
      )
        player3mokCountList[board[i][j]]++;
    }
  }

  const maxCount = Math.max(...player3mokCountList);
  const winPlayerList: { playerName: string; order: number }[] = [];

  player3mokCountList.forEach((count, order) => {
    if (count === maxCount) {
      winPlayerList.push({
        playerName: playerList[order].playerName,
        order,
      });
    }
  });

  return winPlayerList;
};

export default findWinPlayerList;
