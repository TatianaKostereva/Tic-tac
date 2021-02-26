import { PLAYER1, PLAYER2 } from '../model/constants/constants.js';
import countSteps from './countSteps.js';

const initCellClickHandler = (game) => {
  const tableElement = document.querySelector('.field');
  const cellElement = tableElement.querySelectorAll('.cell');

  cellElement.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      if (event.target.className === 'cell') {
        const x = event.target.getAttribute('data-x');
        const y = event.target.getAttribute('data-y');

        countSteps(game, x, y);
        game.currentPlayer = game.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
      }
    });
  });
};

export default initCellClickHandler;
