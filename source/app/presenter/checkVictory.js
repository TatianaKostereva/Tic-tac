import { constants } from '../model/constants/constants.js';
import { initGame } from '../model/initGame.js';
import { createMessage } from '../view/createMessage.js';

export const checkVictory = (player1, playerName1, player2, playerName2, game, root) => {
  let rightDiagonalCount1 = 0;
  let rightDiagonalCount2 = 0;
  let leftDiagonalCount1 = 0;
  let leftDiagonalCount2 = 0;

  for (let i = 0; i < constants.SIZE; i += 1) {
    let rowCount1 = 0;
    let rowCount2 = 0;
    let columnCount1 = 0;
    let columnCount2 = 0;

    for (let j = 0; j < constants.SIZE; j += 1) {
      if (game[i][j] === player1) {
        rowCount1 += 1;
      } else if (game[i][j] === player2) {
        rowCount2 += 1;
      }

      if (game[j][i] === player1) {
        columnCount1 += 1;
      } else if (game[j][i] === player2) {
        columnCount2 += 1;
      }
    }

    if (game[i][i] === player1) {
      leftDiagonalCount1 += 1;
    } else if (game[i][i] === player2) {
      leftDiagonalCount2 += 1;
    }

    if (game[i][constants.SIZE - 1 - i] === player1) {
      rightDiagonalCount1 += 1;
    } else if (game[i][constants.SIZE - 1 - i] === player2) {
      rightDiagonalCount2 += 1;
    }

    if (
      rowCount1 === constants.SIZE
        || columnCount1 === constants.SIZE
        || leftDiagonalCount1 === constants.SIZE
        || rightDiagonalCount1 === constants.SIZE
    ) {
      createMessage(`The ${playerName1} wins!`, root);
      game = initGame();
    }

    if (
      rowCount2 === constants.SIZE
        || columnCount2 === constants.SIZE
        || leftDiagonalCount2 === constants.SIZE
        || rightDiagonalCount2 === constants.SIZE
    ) {
      createMessage(`The ${playerName2} wins!`, root);
      game = initGame();
    }

    if (
      rowCount1 > 0 && rowCount2 > 0
        && columnCount1 > 0 && columnCount2 > 0
        && leftDiagonalCount1 > 0 && leftDiagonalCount2 > 0
        && rightDiagonalCount1 > 0 && rightDiagonalCount2 > 0
    ) {
      createMessage('Draw!', root);
      game = initGame();
    }
  }
};
