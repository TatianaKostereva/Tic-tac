import { PLAYER1, PLAYER2 } from '../model/constants/constants.js';
import countSteps from './countSteps.js';

const initCellClickHandler = (matrix, root, currentPlayer) => {
  const tableElement = document.querySelector('.field');
  const cellElement = tableElement.querySelectorAll('.cell');

  cellElement.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      if (event.target.className === 'cell') {
        const x = event.target.getAttribute('data-x');
        const y = event.target.getAttribute('data-y');

        countSteps(x, y, matrix, currentPlayer, root);
        currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
      }
    });
  });
};

export default initCellClickHandler;
