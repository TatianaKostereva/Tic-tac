import renderField from './view/renderField.js';
import createField from './model/createField.js';
import { PLAYER1 } from './model/constants/constants.js';
import { appendElement } from './helpers/appendElement.js';
import initCellClickHandler from './presenter/clickHandler.js';
import './app.scss';

export const app = (root) => {
  const button = document.createElement('button');
  appendElement(button, 'button', root);
  button.innerText = 'Restart game';

  renderField(root);

  let matrix = createField();
  const currentPlayer = PLAYER1;

  button.addEventListener('click', () => {
    const message = document.querySelector('.message');
    const line = document.querySelector('hr');

    if (message) {
      message.remove();
    }

    if (line) {
      line.remove();
    }

    const tableElement = document.querySelector('.field');
    tableElement.remove();
    renderField(root);
    matrix = createField();
    initCellClickHandler(matrix, root, currentPlayer);
  });

  initCellClickHandler(matrix, root, currentPlayer);
};
