import { createNewTable } from './view/createNewTable.js';
import { initGame } from './model/initGame.js';
import { constants } from './model/constants/constants.js';
import { appendElement } from './helpers/appendElement.js';
import { clickHandler } from './presenter/clickHandler.js';
import './app.scss';

export const app = () => {
  const root = document.querySelector('.root');
  root.textContent = '';

  const button = document.createElement('button');
  appendElement(button, 'button', root);
  button.innerText = 'Restart game';

  createNewTable(root);

  let matrix = initGame();
  const currentPlayer = constants.PLAYER1;

  button.addEventListener('click', () => {
    const message = document.querySelector('.message');
    const line = document.querySelector('hr');

    if (message) {
      message.remove();
    }

    if (line) {
      line.remove();
    }

    const tableElement = document.querySelector('.table');
    tableElement.remove();
    createNewTable(root);
    matrix = initGame();
    clickHandler(matrix, root, currentPlayer);
  });

  clickHandler(matrix, root, currentPlayer);
};
