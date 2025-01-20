import { language } from "../lang/lang";
import { sendToast } from "../utils/utils";

export const checkIfFinished = (
  scoreBoardPlayer1: Map<string, number>,
  scoreBoardPlayer2: Map<string, number>,
  scoreBoardPlayer3: Map<string, number>,
  scoreBoardPlayer4: Map<string, number>,
  numberOfPlayers: number,
  playerNames: string[],
  lang :language,
) => {
  const points = [0, 0, 0, 0];
  const isFinished = [false, false, false, false];
  const scoreBoards = [scoreBoardPlayer1, scoreBoardPlayer2, scoreBoardPlayer3, scoreBoardPlayer4];

  for (let player = 0; player < numberOfPlayers; player++) {
    let keyCount = 0;
    for (const [key, value] of scoreBoards[player].entries()) {
      if (Number(key) >= 1 && Number(key) <= 13) {
        keyCount++;
        points[player] += value;
        if (keyCount === 13) {
          isFinished[player] = true;
        }
      }
    }
  }

  const pointMap = new Map<string, number>();
  // const playerNamesToSort =[];

  // for (let i=0;i<playerNames.length;i++){
  //   const temp = playerNames[0] !=="" ? playerNames[0] : `${lang.player} +${i+1}`;
  //   playerNamesToSort.push(temp);
  // }


  if (isFinished.slice(0, numberOfPlayers).every(finished => finished)) {
    for (let player = 0; player < numberOfPlayers; player++) {
      pointMap.set(playerNames[player], points[player]);
    }
    gameIsFinished(pointMap,lang);
    return true;
  }
};

const gameIsFinished = (pointMap: Map<string, number>, lang :language) => {
  const sortedPoints = Array.from(pointMap.entries()).sort((a, b) => b[1] - a[1]);
  const winner = sortedPoints[0][0];
  sendToast(`${winner} ${lang.isTheWinner}`, 100000);
};