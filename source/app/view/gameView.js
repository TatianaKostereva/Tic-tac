import { DEFAULT_VALUE } from '../constants/constants';
import addElement from '../helpers/addElement';

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
          action(Number(x), Number(y));
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

  createLine(coordinates) {
    let strForClassNameLine = '';
    coordinates.forEach((cellCoordinates) => {
      strForClassNameLine += `${cellCoordinates}_`;
    });

    let numberOfCombination = '';
    switch (strForClassNameLine.slice(0, -1)) {
      case '0,2_0,1_0,0': numberOfCombination = 0;
        break;
      case '2,0_1,0_0,0': numberOfCombination = 1;
        break;
      case '1,2_1,1_1,0': numberOfCombination = 2;
        break;
      case '2,1_1,1_0,1': numberOfCombination = 3;
        break;
      case '2,2_2,1_2,0': numberOfCombination = 4;
        break;
      case '2,2_1,2_0,2': numberOfCombination = 5;
        break;
      case '2,2_1,1_0,0': numberOfCombination = 6;
        break;
      case '2,0_1,1_1,0': numberOfCombination = 7;
        break;
      default: numberOfCombination = '';
        break;
    }

    if (numberOfCombination !== '') {
      addElement('hr', `lineCombination${numberOfCombination}`, this.root);
    }
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
