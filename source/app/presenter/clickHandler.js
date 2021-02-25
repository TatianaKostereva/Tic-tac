import { constants } from '../model/constants/constants.js';
import { countSteps } from './countSteps.js';

export const clickHandler = (matrix, root, currentPlayer) => {
  const tableElement = document.querySelector('.table');
  const cellElement = tableElement.querySelectorAll('.cell');

  cellElement.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      if (event.target.className === 'cell') {
        const x = event.target.getAttribute('data-x');
        const y = event.target.getAttribute('data-y');

        countSteps(x, y, matrix, currentPlayer, root);
        currentPlayer = currentPlayer === constants.PLAYER1 ? constants.PLAYER2 : constants.PLAYER1;
      }
    });
  });
};
