export const checkIfFinished = (
  scoreBoardPlayer1: Map<string, number>,
  scoreBoardPlayer2: Map<string, number>,
  scoreBoardPlayer3: Map<string, number>,
  scoreBoardPlayer4: Map<string, number>,
  numberOfPlayers: number,
  playerNames: string[],

  setEndScores: (newEndScores: Map<string, number>) => void,
) => {
  const points = [0, 0, 0, 0];
  const isFinished = [false, false, false, false];
  const scoreBoards = [
    scoreBoardPlayer1,
    scoreBoardPlayer2,
    scoreBoardPlayer3,
    scoreBoardPlayer4,
  ];

  for (let player = 0; player < numberOfPlayers; player++) {
    let keyCount = 0;
    for (const [key, value] of scoreBoards[player].entries()) {
      if (Number(key) >= 1 && Number(key) <= 13) {
        keyCount++;
        points[player] += value;
        //check for finish
        if (keyCount === 13) {
          isFinished[player] = true;
        }
      }
    }
  }
  //check for bonus
  for (let player = 0; player < numberOfPlayers; player++) {
    let sumFirstSixRounds = 0;
    for (const [key, value] of scoreBoards[player].entries()) {
      if (Number(key) >= 1 && Number(key) <= 6) {
        sumFirstSixRounds += value;
      }
    }
    if (sumFirstSixRounds >= 63) {
      points[player] += 35;
    }
  }

  const pointMap = new Map<string, number>();

  if (isFinished.slice(0, numberOfPlayers).every((finished) => finished)) {
    for (let player = 0; player < numberOfPlayers; player++) {
      pointMap.set(playerNames[player], points[player]);
    }
    setEndScores(pointMap);

    return true;
  }
};

export const gameIsFinished = (pointMap: Map<string, number>) => {
  const sortedPoints = Array.from(pointMap.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  return sortedPoints;
};
