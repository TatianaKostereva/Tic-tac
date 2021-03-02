import { DEFAULT_VALUE } from '../constants/constants.js';
import addElement from '../helpers/addElement.js';

class GameView {
  constructor(root, FIELD_SIZE) {
    this.root = root;
    this.fieldSize = FIELD_SIZE;
  }

  createMessage(messageText) {
    const message = addElement('div', 'message', this.root);
    message.innerText = `${messageText}`;
  }

  renderField(action) {
    const div = addElement('div', 'fieldModel', this.root);
    const field = addElement('table', 'field', div);

    for (let i = 0; i < this.fieldSize; i += 1) {
      const row = addElement('tr', 'row', field);

      for (let j = 0; j < this.fieldSize; j += 1) {
        const cell = addElement('td', 'cell', row);
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);

        cell.addEventListener('click', (event) => {
          const x = event.target.getAttribute('data-x');
          const y = event.target.getAttribute('data-y');
          action(x, y);
        });
      }
    }
  }

  clearField() {
    this.root
      .querySelectorAll('.cell')
      .forEach((cell) => {
        cell.innerText = '';
        cell.classList.remove('cell-0');
        cell.classList.remove('cell-1');
      });
  }

  renderButton(name, action) {
    const button = addElement('button', 'button', this.root);
    button.innerText = name;

    button.addEventListener('click', () => {
      const message = this.root.querySelector('.message');
      const line = this.root.querySelector('hr');

      if (message) {
        message.remove();
      }

      if (line) {
        line.remove();
      }

      action();
    });
  }

  occupationCell(x, y, icon, numberOfPlayer) {
    const occupationCell = this.root.querySelector(`[data-x='${x}'][data-y='${y}']`);
    occupationCell.innerText = icon;
    occupationCell.classList.add(`cell-${numberOfPlayer}`);
  }

  createLine(numberOfCombination) {
    addElement('hr', `lineCombination${numberOfCombination}`, this.root);
  }

  clear() {
    for (let i = 0; i < this.fieldSize; i += 1) {
      for (let j = 0; j < this.fieldSize; j += 1) {
        this.field[`${i}${j}`] = DEFAULT_VALUE;
      }
    }
  }
}

export default GameView;
