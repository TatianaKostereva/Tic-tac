import { addElement } from '../helpers/addElement';
import { deleteElement } from '../helpers/deleteElement';
import { addStylesForWinLine } from '../helpers/addStylesForWinLine';
import {
  ActionType,
  OccupationCellArgs,
  stepCounterType,
} from '../types/types';
import { WIN_LENGTH, LINE_WIDTH } from '../constants/constants';
import { sortCoordinates } from '../helpers/sortCoordinates';
import { GameCountersView } from './gameCountersView';

class GameView {
  public root: HTMLElement;
  public fieldSize: number;
  public counterView!: GameCountersView;
  public counter!: stepCounterType;

  constructor(root: HTMLElement, FIELD_SIZE: number) {
    this.root = root;
    this.fieldSize = FIELD_SIZE;
  }

  renderField(fieldSize: number = this.fieldSize, action: ActionType): void {
    const div = addElement({
      nameElement: 'div',
      className: 'fieldModel',
      parentElement: this.root,
    });
    const field = addElement({
      nameElement: 'table',
      className: 'field',
      parentElement: div,
    });

    for (let i = 0; i < fieldSize; i += 1) {
      const row = addElement({
        nameElement: 'tr',
        className: 'row',
        parentElement: field,
      });

      for (let j = 0; j < fieldSize; j += 1) {
        const cell = addElement({
          nameElement: 'td',
          className: 'cell',
          parentElement: row,
        });
        cell.setAttribute('data-x', i.toString());
        cell.setAttribute('data-y', j.toString());

        cell.addEventListener('click', (event: MouseEvent) => {
          const target = event.target as Element;
          const x = target.getAttribute('data-x');
          const y = target.getAttribute('data-y');
          action([Number(x), Number(y)]);
        });
      }
    }
  }

  occupationCell({
    coordinates,
    icon,
    numberOfPlayer,
  }: OccupationCellArgs): void {
    const [x, y] = coordinates;
    const occupationCell = this.root.querySelector<HTMLTableDataCellElement>(
      `[data-x='${x}'][data-y='${y}']`,
    );

    if (!occupationCell) {
      return;
    }

    occupationCell.innerText = icon;
    occupationCell.classList.add(`cell-${numberOfPlayer}`);
  }

  createMessage(messageText: string): void {
    const message = addElement({
      nameElement: 'div',
      className: 'message',
      parentElement: this.root,
      innerText: messageText,
    });
  }

  createLine(coordinates: number[][], indexOfWinLine: number): void {
    const sortedCoordinates = sortCoordinates(coordinates);
    const divForField = this.root.querySelector<HTMLElement>('.fieldModel');

    if (divForField === null) {
      return;
    }

    const line = addElement({
      nameElement: 'div',
      className: 'line',
      parentElement: divForField,
    });

    const startOfLine = this.root.querySelector<HTMLTableDataCellElement>(
      `[data-x='${sortedCoordinates[0][0]}'][data-y='${coordinates[0][1]}']`,
    );

    const endOfLine = this.root.querySelector<HTMLTableDataCellElement>(
      `[data-x='${sortedCoordinates[WIN_LENGTH - 1][0]}'][data-y='${
        coordinates[WIN_LENGTH - 1][1]
      }']`,
    );

    if (startOfLine === null || endOfLine === null) {
      return;
    }

    const coordsOfLineStart = startOfLine.getBoundingClientRect();
    const coordsOfLineEnd = endOfLine.getBoundingClientRect();

    let lengthOfLine = 0;
    const lengthOfGorizontalLine = coordsOfLineEnd.x - coordsOfLineStart.x;
    const lengthOfVerticalLine = coordsOfLineEnd.y - coordsOfLineStart.y;
    const lengthOfDiagonal = Math.sqrt(
      lengthOfGorizontalLine * lengthOfGorizontalLine +
        lengthOfVerticalLine * lengthOfVerticalLine,
    );

    const halfOfWidthCell = coordsOfLineStart.width / 2;
    const halfOfHeightCell = coordsOfLineStart.height / 2;

    switch (indexOfWinLine) {
      case 0: {
        lengthOfLine = lengthOfGorizontalLine;
        const left = coordsOfLineStart.x + halfOfWidthCell;
        const top = coordsOfLineStart.y + halfOfHeightCell - LINE_WIDTH / 2;
        addStylesForWinLine({
          line,
          lengthOfLine,
          top,
          left,
        });
        break;
      }
      case 1: {
        lengthOfLine = lengthOfVerticalLine;
        const left = coordsOfLineStart.x - halfOfWidthCell - LINE_WIDTH / 2;
        const top = coordsOfLineEnd.y - halfOfHeightCell - LINE_WIDTH;
        addStylesForWinLine({
          line,
          lengthOfLine,
          top,
          left,
          degOfRotate: 90,
        });
        break;
      }
      case 2: {
        lengthOfLine = Math.round(lengthOfDiagonal);
        const left = coordsOfLineStart.x + LINE_WIDTH - 2;
        const top = coordsOfLineEnd.y - halfOfHeightCell - LINE_WIDTH;
        addStylesForWinLine({
          line,
          lengthOfLine,
          top,
          left,
          degOfRotate: 45,
        });
        break;
      }
      default: {
        lengthOfLine = Math.round(lengthOfDiagonal);
        const left = coordsOfLineEnd.x + LINE_WIDTH;
        const top = coordsOfLineEnd.y - halfOfHeightCell - LINE_WIDTH;
        addStylesForWinLine({
          line,
          lengthOfLine,
          top,
          left,
          degOfRotate: 135,
        });
        break;
      }
    }
  }

  inputInit(callback: any): void {
    const inputContainer = addElement({
      nameElement: 'div',
      className: 'gameView-input_container',
      parentElement: this.root,
    });

    const inputTextContainer = addElement({
      nameElement: 'div',
      className: 'gameView-input-text_container',
      parentElement: inputContainer,
      innerText: 'Input field size:',
    });

    const inputEl = addElement({
      nameElement: 'input',
      className: 'gameView-input',
      parentElement: inputContainer,
    }) as HTMLInputElement;

    const inputButton = addElement({
      nameElement: 'input',
      className: 'gameView-input-button',
      parentElement: inputContainer,
    }) as HTMLInputElement;

    inputButton.setAttribute('type', 'button');
    inputButton.value = 'Send';

    inputButton.addEventListener('click', ({ target }) => {
      const fieldSize = inputEl.value;
      callback(fieldSize);
    });
  }

  renderCounter(counter: stepCounterType) {
    this.counter = counter;
    this.counterView = new GameCountersView(this.root, counter);

    const container = addElement({
      nameElement: 'div',
      className: 'statisticContainer',
      parentElement: this.root,
    });

    this.counterView.renderCounters('Player');
    this.counterView.renderCounters('Computer');
  }

  rerenderCounters() {
    const counterContainerPlayer = this.root.querySelector(
      '.counter_container-player .counter',
    ) as HTMLDivElement;
    const counterContainerComputer = this.root.querySelector(
      '.counter_container-computer .counter',
    ) as HTMLElement;

    counterContainerPlayer?.innerText = this.counter['0']?.toString();
    counterContainerComputer?.innerText = this.counter['1']?.toString();
  }

  renderStepMessage(stepMessageText: string) {
    const statisticContainer = this.root.querySelector('.statisticContainer');
    if (statisticContainer) {
      const stepMessage = addElement({
        nameElement: 'div',
        className: 'stepMessage',
        parentElement: statisticContainer,
        innerText: stepMessageText,
      });
    }
  }

  deleteStepMessage() {
    deleteElement(this.root, 'stepMessage');
  }

  deleteCounters() {
    deleteElement(this.root, 'counter_container-player');
    deleteElement(this.root, 'counter_container-computer');
  }

  deleteField() {
    deleteElement(this.root, 'field');
    deleteElement(this.root, 'fieldModel');
  }

  deleteMessage(): void {
    deleteElement(this.root, 'message');
  }

  deleteLine(): void {
    deleteElement(this.root, 'line');
  }

  deleteMenu(): void {
    deleteElement(this.root, 'dropdownMenu');
  }

  deleteInput(): void {
    deleteElement(this.root, 'gameView-input_container');
  }
}

export { GameView };
