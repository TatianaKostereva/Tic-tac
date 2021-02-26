import {
  PLAYER1, FIRST_PLAYER, SECOND_PLAYER, DEFAULT_VALUE,
} from '../model/constants/constants.js';
import checkVictory from './checkVictory.js';
import createMessage from '../view/createMessage.js';
import createLine from '../view/createLine.js';

const countSteps = (game, x, y) => {
  if (game.matrix[x][y] !== DEFAULT_VALUE) {
    return;
  }
  game.matrix[x][y] = game.currentPlayer;

  const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
  cell.innerText = (game.currentPlayer === PLAYER1) ? 'X' : 'O';
  cell.classList.add(`cell-${game.currentPlayer}`);

  const winPlayer = checkVictory(game.matrix);

  if (winPlayer === null) {
    return;
  }

  if (winPlayer === 'Draw!') {
    createMessage('Draw!', game.root);
  } else {
    const playerName = (winPlayer.numberOfPlayer === '1') ? FIRST_PLAYER : SECOND_PLAYER;
    createMessage(`The ${playerName} wins!`, game.root);
    createLine(game.root, winPlayer.numberOfCombination);
  }
};

export default countSteps;
