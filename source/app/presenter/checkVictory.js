import { constants } from '../model/constants/constants.js';
import { initGame } from '../model/initGame.js';
import { createMessage } from '../view/createMessage.js';
import { checkCombination } from './checkCombination.js';

export const checkVictory = (player1, playerName1, player2, playerName2, matrix, root) => {
  let rightDiagonalCount1 = 0;
  let rightDiagonalCount2 = 0;
  let leftDiagonalCount1 = 0;
  let leftDiagonalCount2 = 0;
  const rowCount1 = {
    0: 0,
    1: 0,
    2: 0,
  };
  const columnCount1 = {
    0: 0,
    1: 0,
    2: 0,
  };
  const rowCount2 = {
    0: 0,
    1: 0,
    2: 0,
  };
  const columnCount2 = {
    0: 0,
    1: 0,
    2: 0,
  };

  for (let i = 0; i < constants.MATRIXSIZE; i += 1) {
    for (let j = 0; j < constants.MATRIXSIZE; j += 1) {
      if (matrix[i][j] === player1) {
        rowCount1[i] += 1;
      } else if (matrix[i][j] === player2) {
        rowCount2[i] += 1;
      }

      if (matrix[j][i] === player1) {
        columnCount1[i] += 1;
      } else if (matrix[j][i] === player2) {
        columnCount2[i] += 1;
      }
    }

    if (matrix[i][i] === player1) {
      leftDiagonalCount1 += 1;
    } else if (matrix[i][i] === player2) {
      leftDiagonalCount2 += 1;
    }

    if (matrix[i][constants.MATRIXSIZE - 1 - i] === player1) {
      rightDiagonalCount1 += 1;
    } else if (matrix[i][constants.MATRIXSIZE - 1 - i] === player2) {
      rightDiagonalCount2 += 1;
    }

    checkCombination(rowCount1[i], playerName1, root, 'row', i);
    checkCombination(columnCount1[i], playerName1, root, 'column', i);
    checkCombination(leftDiagonalCount1, playerName1, root, 'leftdiagonal');
    checkCombination(rightDiagonalCount1, playerName1, root, 'rightdiagonal');

    checkCombination(rowCount2[i], playerName2, root, 'row', i);
    checkCombination(columnCount2[i], playerName2, root, 'column', i);
    checkCombination(leftDiagonalCount2, playerName2, root, 'leftdiagonal');
    checkCombination(rightDiagonalCount2, playerName2, root, 'rightdiagonal');

    if (
      rowCount1[i] > 0 && rowCount2[i] > 0
        && columnCount1[i] > 0 && columnCount2[i] > 0
        && leftDiagonalCount1 > 0 && leftDiagonalCount2 > 0
        && rightDiagonalCount1 > 0 && rightDiagonalCount2 > 0
    ) {
      createMessage('Draw!', root);
      matrix = initGame();
    }
  }
};
