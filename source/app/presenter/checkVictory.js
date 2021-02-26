import { MATRIX_SIZE, DEFAULT_VALUE } from '../model/constants/constants.js';

const checkVictory = (matrix) => {
  const playLines = [];

  for (let i = 0; i < MATRIX_SIZE; i += 1) {
    const row = [];
    const column = [];
    for (let j = 0; j < MATRIX_SIZE; j += 1) {
      row.push(matrix[i][j]);
      column.push(matrix[j][i]);
    }
    playLines.push(row);
    playLines.push(column);
  }

  const leftDiagonal = [];
  const rightDiagonal = [];
  for (let i = 0; i < MATRIX_SIZE; i += 1) {
    leftDiagonal.push(matrix[i][i]);
    rightDiagonal.push(matrix[MATRIX_SIZE - 1 - i][i]);
  }
  playLines.push(leftDiagonal);
  playLines.push(rightDiagonal);

  let quantityLinesHasStepsOfTwoPlayers = 0;
  for (let i = 0; i < playLines.length; i += 1) {
    const mapOfQuantitySteps = {};
    for (let j = 0; j < playLines[i].length; j += 1) {
      if (playLines[i][j] !== DEFAULT_VALUE) {
        if (!mapOfQuantitySteps[playLines[i][j]]) {
          mapOfQuantitySteps[playLines[i][j]] = 0;
        }
        mapOfQuantitySteps[playLines[i][j]] += 1;
      }
    }

    const players = Object.keys(mapOfQuantitySteps);
    if (players.length > 1) {
      quantityLinesHasStepsOfTwoPlayers += 1;
    } else if (
      players.length === 1
      && mapOfQuantitySteps[players[0]] === MATRIX_SIZE
    ) {
      return {
        numberOfPlayer: players[0],
        numberOfCombination: i,
      };
    }
  }

  if (quantityLinesHasStepsOfTwoPlayers === playLines.length) {
    return 'Draw!';
  }

  return null;
};

export default checkVictory;
