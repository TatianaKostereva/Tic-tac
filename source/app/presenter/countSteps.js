import { constants } from '../model/constants/constants.js';
import { checkVictory } from './checkVictory.js';

export const countSteps = (x, y, matrix, currentPlayer, root) => {
  if (matrix[x][y] === constants.EMPTY) {
    matrix[x][y] = currentPlayer;
  }

  const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
  cell.innerText = (currentPlayer === constants.PLAYER1) ? 'X' : 'O';
  cell.classList.add(`cell-${currentPlayer}`);

  checkVictory(constants.PLAYER1,
    constants.FIRSTPLAYER,
    constants.PLAYER2,
    constants.SECONDPLAYER,
    matrix,
    root);
};
