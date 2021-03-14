import { addElement } from '../helpers/addElement';
import { addStylesForWinLine } from '../helpers/addStylesForWinLine';
import { ActionType, OccupationCellArgs } from '../types';
import { WIN_LENGTH, LINE_WIDTH } from '../constants/constants';
import { sortCoordinates } from '../helpers/sortCoordinates';
import type { GameView } from './gameView';

type TActionButtonConfig = {
  title: string,
  action: () => void,
}

type TSumMenuConfig = {
  title: string,
  children: TActionButtonConfig;
}

type TMenuElement = TSumMenuConfig | TActionButtonConfig;

class GameMenuView {
  public root: HTMLElement;
  private menuNode!: HTMLElement;
  private menuContent!: HTMLElement;
  public view: GameView;

  constructor(root: HTMLElement, view: GameView) {
    this.root = root;
    this.view = view;
  }

  renderMenu(): void {
    this.menuNode = addElement({
      nameElement: 'div',
      className: 'dropdownMenu',
      parentElement: this.root,
    });
    const dropButton = addElement({
      nameElement: 'button',
      className: 'dropButton',
      parentElement: this.menuNode,
      innerText: 'Menu',
    });
    this.menuContent = addElement({
      nameElement: 'div',
      className: 'dropdownContent',
      parentElement: this.menuNode,
    });

    dropButton.addEventListener('click', event => {
        this.menuContent.classList.toggle('show');
    });
  }

  initMenu(buttons: TMenuElement[]): void {
    if (this.menuNode) {
      this.menuNode.remove();
    }
    this.renderMenu();
    this.renderButtons(buttons);
    //this.addSelectPlayer();
  }

  renderButtons(buttons: TMenuElement[]): void {

  }

  renderButton(button: TActionButtonConfig, parent = this.menuContent): HTMLElement {
    const rowMenuElement = addElement({
      nameElement: 'div',
      className: 'firstElementContent',
      parentElement: parent,
    });

    const buttonElement = addElement({
      nameElement: 'a',
      className: 'firstElementContent',
      parentElement: rowMenuElement,
      innerText: button.title,
    });

    buttonElement.addEventListener('click', () => {
      this.view.clearMessage;
      this.view.clearLine;

      button.action();
      this.menuContent.classList.remove('show');
    });

    //this.addFieldSize();
    return rowMenuElement;
  }

  renderSubMenu(subMenu: TSumMenuConfig) {
    //let activePlayer = 0;

    const rowElement = this.renderButton({
      title: 'Select first player',
      action: ()  => {},
    });

    const subMenuElement = addElement({
      nameElement: 'div',
      className: 'selectPlayerDropdownContent',
      parentElement: rowElement,
    });

    subMenu.children.forEach((button) => {
      this.renderButton(button, subMenuElement);
    })

  }

  addSelectPlayer(): number {
    // let activePlayer = 0;

    // const addSelectPlayerField = addElement({
    //   nameElement: 'div',
    //   className: 'secondElementContent',
    //   parentElement: this.menuContent,
    // });

    // const selectFirstPlayer = addElement({
    //   nameElement: 'a',
    //   className: 'selectFirstPlayer',
    //   parentElement: addSelectPlayerField,
    //   innerText: 'Select first player',
    // });
 
    // const selectPlayerDropdownContent = addElement({
    //   nameElement: 'ul',
    //   className: 'selectPlayerDropdownContent',
    //   parentElement: addSelectPlayerField,
    // });

    // const playerField = addElement({
    //   nameElement: 'li',
    //   className: 'playerField',
    //   parentElement: selectPlayerDropdownContent,
    //   innerText: 'Player',
    // });

    const computerField = addElement({
      nameElement: 'li',
      className: 'computerField',
      parentElement: selectPlayerDropdownContent,
      innerText: 'Computer',
    });

    addSelectPlayerField.addEventListener('click', () => {
      selectPlayerDropdownContent.classList.toggle('showMore');
    });

    selectPlayerDropdownContent.addEventListener(
      'click',
      (event: MouseEvent) => {
        const target = event.target as Element;
        if (target !== null && target.className === 'playerField') {
          activePlayer = 0;
          return activePlayer;
        }

        if (target !== null && target.className === 'computerField') {
          activePlayer = 1;
          return activePlayer;
        }
      },
    );
    return activePlayer;
  }

  addFieldSize() {
    const addFieldSizeField = addElement({
      nameElement: 'div',
      className: 'addFieldSizeField',
      parentElement: this.menuContent,
      innerText: 'Add Field Size',
    });

    addFieldSizeField.addEventListener('click', () => {
      const divForInput = addElement({
        nameElement: 'div',
        className: 'divForInput',
        parentElement: this.root,
      });

      const input = addElement({
        nameElement: 'input',
        className: 'inputFieldSize',
        parentElement: divForInput,
      }) as Element;

      input.type = 'textarea';
    });
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
}

export { GameMenuView };
