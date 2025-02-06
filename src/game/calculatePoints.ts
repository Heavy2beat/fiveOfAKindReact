export function setDicesToPoints(
  number: number,
  dices: number[],
  scoreBoard: Map<string, number>,
  setScoreBoard: (newBoard: Map<string, number>) => void,
) {
  let points: number[] = [];

  let tempScoreUpper = 0;
  let tempScoreLower = 0;

  if (number <= 6) {
    switch (number) {
      case 1:
        points = dices.filter((e) => e === 1);
        break;
      case 2:
        points = dices.filter((e) => e === 2);
        break;
      case 3:
        points = dices.filter((e) => e === 3);
        break;
      case 4:
        points = dices.filter((e) => e === 4);
        break;
      case 5:
        points = dices.filter((e) => e === 5);
        break;
      case 6:
        points = dices.filter((e) => e === 6);
        break;
    }

    tempScoreUpper = points.length !== 0 ? points.reduce((a, b) => a + b) : 0;

    const temp = scoreBoard;
    


    temp.set(String(number), tempScoreUpper);
    setScoreBoard(temp);
  } else if (number > 6) {
    switch (number) {
      case 7: //Three of a kind
        tempScoreLower = ofAKindCalculator(3, dices);
        break;
      case 8: //Four of a kind
        tempScoreLower = ofAKindCalculator(4, dices);
        break;
      case 9: // Full House
        tempScoreLower = fullHouseCalculator(dices);
        break;
      case 10: //sm Straight
        tempScoreLower = straightCalculator(3, dices);
        break;
      case 11: //lg Straight
        tempScoreLower = straightCalculator(4, dices);
        break;
      case 12: // Yahtzee
        tempScoreLower = ofAKindCalculator(5, dices);
        break;
      case 13: //Chance
        tempScoreLower = dices.reduce((a, b) => a + b);
        break;
    }

    const temp = scoreBoard;
    temp.set(String(number), tempScoreLower);
    setScoreBoard(temp);
  }
}

function ofAKindCalculator(number: number, dicesToCheck: number[]) {
  const counts1 = dicesToCheck.filter((e) => e == 1);
  const counts2 = dicesToCheck.filter((e) => e == 2);
  const counts3 = dicesToCheck.filter((e) => e == 3);
  const counts4 = dicesToCheck.filter((e) => e == 4);
  const counts5 = dicesToCheck.filter((e) => e == 5);
  const counts6 = dicesToCheck.filter((e) => e == 6);

  let pointsForReturn = 0;

  if (counts1.length >= number) {
    if (number === 5) {
      return 50;
    }
    pointsForReturn = dicesToCheck.reduce((a, b) => a + b);
  } else if (counts2.length >= number) {
    if (number === 5) {
      return 50;
    }
    pointsForReturn = dicesToCheck.reduce((a, b) => a + b);
  } else if (counts3.length >= number) {
    if (number === 5) {
      return 50;
    }
    pointsForReturn = dicesToCheck.reduce((a, b) => a + b);
  } else if (counts4.length >= number) {
    if (number === 5) {
      return 50;
    }
    pointsForReturn = dicesToCheck.reduce((a, b) => a + b);
  } else if (counts5.length >= number) {
    if (number === 5) {
      return 50;
    }
    pointsForReturn = dicesToCheck.reduce((a, b) => a + b);
  } else if (counts6.length >= number) {
    if (number === 5) {
      return 50;
    }
    pointsForReturn = dicesToCheck.reduce((a, b) => a + b);
  }
  return pointsForReturn;
}

function fullHouseCalculator(dicesToCheck: number[]) {
  const counts1 = dicesToCheck.filter((e) => e == 1);
  const counts2 = dicesToCheck.filter((e) => e == 2);
  const counts3 = dicesToCheck.filter((e) => e == 3);
  const counts4 = dicesToCheck.filter((e) => e == 4);
  const counts5 = dicesToCheck.filter((e) => e == 5);
  const counts6 = dicesToCheck.filter((e) => e == 6);

  const countOfDices = [
    counts1.length,
    counts2.length,
    counts3.length,
    counts4.length,
    counts5.length,
    counts6.length,
  ];

  if (countOfDices.includes(3)) {
    if (countOfDices.includes(2)) {
      return 25;
    }
  }
  return 0;
}

function areIncluded(number1: number, number2: number, dices: number[]) {
  if (dices.includes(number1) && dices.includes(number2)) {
    return true;
  } else return false;
}

function straightCalculator(max: number, dices: number[]) {
  const oneToTwo = areIncluded(1, 2, dices);
  const twoToThree = areIncluded(2, 3, dices);
  const threeToFour = areIncluded(3, 4, dices);
  const fourToFive = areIncluded(4, 5, dices);
  const fiveToSix = areIncluded(5, 6, dices);

  const straightpossible = [
    oneToTwo,
    twoToThree,
    threeToFour,
    fourToFive,
    fiveToSix,
  ];

  let straightIndex = 0;

  let pointsForReturn = 0;

  straightpossible.forEach((element) => {
    if (element == true) {
      straightIndex += 1;

      if (max == 3) {
        if (straightIndex == 3) {
          pointsForReturn = 30;
        }
      }
      if (max == 4) {
        if (straightIndex == 4) {
          pointsForReturn = 40;
        }
      }
    } else if (element == false) {
      straightIndex = 0;
    }
  });
  return pointsForReturn;
}
