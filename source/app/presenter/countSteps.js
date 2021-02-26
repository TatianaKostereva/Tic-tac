import {
  PLAYER1, FIRST_PLAYER, SECOND_PLAYER, DEFAULT_VALUE,
} from '../model/constants/constants.js';
import checkVictory from './checkVictory.js';
import createMessage from '../view/createMessage.js';
import createLine from '../view/createLine.js';

const countSteps = (x, y, matrix, currentPlayer, root) => {
  if (matrix[x][y] === DEFAULT_VALUE) {
    matrix[x][y] = currentPlayer;
  }

  const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
  cell.innerText = (currentPlayer === PLAYER1) ? 'X' : 'O';
  cell.classList.add(`cell-${currentPlayer}`);

  const winPlayer = checkVictory(matrix);

  if (winPlayer === null) {
    return;
  }

  if (winPlayer === 'Draw!') {
    createMessage('Draw!', root);
  } else {
    const playerName = (winPlayer.numberOfPlayer === '1') ? FIRST_PLAYER : SECOND_PLAYER;
    createMessage(`The ${playerName} wins!`, root);
    createLine(root, winPlayer.numberOfCombination);
  }
};

export default countSteps;
