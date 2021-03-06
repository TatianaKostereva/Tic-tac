import { DEFAULT_VALUE } from '../constants/constants';
import addElement from '../helpers/addElement';
import {
  actionType,
  CoordinatesType,
  occupationCellArgs,
} from '../helpers/interfaces';

class GameView {
  public root: HTMLElement;
  public fieldSize: number;

  constructor(root: HTMLElement, FIELD_SIZE: number) {
    this.root = root;
    this.fieldSize = FIELD_SIZE;
  }

  createMessage(messageText: string): void {
    const message = addElement({ nameElement: 'div', className: 'message', parentElement: this.root });
    message.innerText = `${messageText}`;
  }

  renderField(action: actionType): void {
    const div = addElement({ nameElement: 'div', className: 'fieldModel', parentElement: this.root });
    const field = addElement({ nameElement: 'table', className: 'field', parentElement: div });

    for (let i = 0; i < this.fieldSize; i += 1) {
      const row = addElement({ nameElement: 'tr', className: 'row', parentElement: field });

      for (let j = 0; j < this.fieldSize; j += 1) {
        const cell = addElement({ nameElement: 'td', className: 'cell', parentElement: row });
        cell.setAttribute('data-x', i.toString());
        cell.setAttribute('data-y', j.toString());

        cell.addEventListener(
          'click', (event) => {
            const target = event.target as Element;
            const x = target.getAttribute('data-x');
            const y = target.getAttribute('data-y');
            action([Number(x), Number(y)]);
          },
        );
      }
    }
  }

  clearField() {
    const cellElement = Array.from(
      this.root.querySelectorAll<HTMLTableDataCellElement>('.cell'),
    );
    cellElement.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove('cell-0');
      cell.classList.remove('cell-1');
    });
  }

  renderButton(name: string, action: () => void) {
    const button = addElement({ nameElement: 'button', className: 'button', parentElement: this.root });
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

  occupationCell({
    coordinates,
    icon,
    numberOfPlayer,
  }: occupationCellArgs): void {
    const [x, y] = coordinates;
    const occupationCell: HTMLInputElement | null = this.root.querySelector(
      `[data-x='${x}'][data-y='${y}']`,
    );

    if (!occupationCell) {
      return;
    }

    occupationCell.innerText = icon;
    occupationCell.classList.add(`cell-${numberOfPlayer}`);
  }

  createLine(coordinates: number[][]): void {
    let strForClassNameLine = '';
    coordinates.forEach(cellCoordinates => {
      strForClassNameLine += `${cellCoordinates}_`;
    });

    let numberOfCombination: string | number = '';
    switch (strForClassNameLine.slice(0, -1)) {
      case '0,2_0,1_0,0':
        numberOfCombination = 0;
        break;
      case '2,0_1,0_0,0':
        numberOfCombination = 1;
        break;
      case '1,2_1,1_1,0':
        numberOfCombination = 2;
        break;
      case '2,1_1,1_0,1':
        numberOfCombination = 3;
        break;
      case '2,2_2,1_2,0':
        numberOfCombination = 4;
        break;
      case '2,2_1,2_0,2':
        numberOfCombination = 5;
        break;
      case '2,2_1,1_0,0':
        numberOfCombination = 6;
        break;
      case '2,0_1,1_1,0':
        numberOfCombination = 7;
        break;
      default:
        numberOfCombination = '';
        break;
    }

    if (numberOfCombination !== '') {
      addElement({ nameElement: 'hr', className: `lineCombination${numberOfCombination}`, parentElement: this.root });
    }
  }
}

export default GameView;
