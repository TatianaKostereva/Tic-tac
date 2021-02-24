import { createNewTable } from './view/createNewTable.js';
import { constants } from './model/constants/constants.js';
import { countSteps } from './presenter/countSteps.js';
import './app.scss';

const array = new Array(constants.SIZE).fill([]);
const game = array.map(() => new Array(constants.SIZE).fill(0));

export const app = () => {
  const root = document.querySelector('.root');
  root.textContent = '';
  createNewTable(root);

  const tableElement = document.querySelector('.table');
  const cellElement = tableElement.querySelectorAll('.cell');

  cellElement.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      if (event.target.className === 'cell') {
        const x = event.target.getAttribute('data-x');
        const y = event.target.getAttribute('data-y');

        countSteps(x, y, game, root);
      }
    });
  });
};
