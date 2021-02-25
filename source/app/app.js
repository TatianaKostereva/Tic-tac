import { createNewTable } from './view/createNewTable.js';
import { initGame } from './model/initGame.js';
import { constants } from './model/constants/constants.js';
import { countSteps } from './presenter/countSteps.js';
import './app.scss';

export const app = () => {
  const root = document.querySelector('.root');
  root.textContent = '';
  createNewTable(root);

  const tableElement = document.querySelector('.table');
  const cellElement = tableElement.querySelectorAll('.cell');
  const matrix = initGame();
  let currentPlayer = constants.PLAYER1;

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
