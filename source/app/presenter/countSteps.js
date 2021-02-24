import { constants } from '../model/constants/constants.js';
import { checkVictory } from './checkVictory.js';

let currentPlayer = constants.PLAYER1;

export const countSteps = (x, y, game, root) => {
  if (game[x][y] === constants.EMPTY) {
    game[x][y] = currentPlayer;
  }

  const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
  cell.innerText = (currentPlayer === constants.PLAYER1) ? 'X' : 'O';
  cell.classList.add(`cell-${currentPlayer}`);

  currentPlayer = currentPlayer === constants.PLAYER1 ? constants.PLAYER2 : constants.PLAYER1;

  checkVictory(constants.PLAYER1,
    constants.FIRSTPLAYER,
    constants.PLAYER2,
    constants.SECONDPLAYER,
    game,
    root);
};
