import './app.scss';
import Computer from './players/computer.js';
import GameObject from './players/gameObject.js';
import View from './view/view.js';

class App {
  constructor(FIELD_SIZE, root) {
    this.field = [];
    this.fieldSize = FIELD_SIZE;
    this.createField();

    this.DEFAULT_VALUE = 0;
    this.root = root;

    this.computer = new Computer('O', 2);
    this.humanPlayer = new GameObject('X', 1);

    this.view = new View(this.root);
    this.view.renderButton(this);
    this.view.renderField(this.fieldSize);

    this.restartGame();
  }

  restartGame() {
    const button = document.querySelector('.button');
    const tableElement = document.querySelector('.field');
    const cellElement = tableElement.querySelectorAll('.cell');

    button.addEventListener('click', () => {
      const message = document.querySelector('.message');
      const line = document.querySelector('hr');

      if (message) {
        message.remove();
      }

      if (line) {
        line.remove();
      }

      this.view.restart(cellElement);
      this.clearField();
      this.init();
    });
  }

  init() {
    const tableElement = document.querySelector('.field');
    const cellElement = tableElement.querySelectorAll('.cell');

    cellElement.forEach((cell) => {
      cell.addEventListener('click', (event) => {
        if (event.target.className === 'cell' && event.target.innerText === '') {
          const x = event.target.getAttribute('data-x');
          const y = event.target.getAttribute('data-y');
          this.clickOnCell(x, y);
        }
      });
    });
  }


  clickOnCell(x, y) {
    this.humanPlayer.step(x, y, this.field, this.fieldSize, this.view, this.DEFAULT_VALUE);

    if (this.checkGameState(this.humanPlayer) !== undefined) {
      return;
    }

    this.computer.randomStep(x, y, this.field, this.fieldSize, this.view, this.DEFAULT_VALUE);
    this.checkGameState(this.computer);
  }

  createField() {
    for (let i = 0; i < this.fieldSize; i += 1) {
      this.field[i] = [];
      for (let j = 0; j < this.fieldSize; j += 1) {
        this.field[i][j] = this.DEFAULT_VALUE;
      }
    }
  }

  checkWin(field, fieldSize, defaultValue) {
    const playLines = [];

    for (let i = 0; i < fieldSize; i += 1) {
      const row = [];
      const column = [];
      for (let j = 0; j < fieldSize; j += 1) {
        row.push(field[i][j]);
        column.push(field[j][i]);
      }
      playLines.push(row);
      playLines.push(column);
    }

    const leftDiagonal = [];
    const rightDiagonal = [];
    for (let i = 0; i < fieldSize; i += 1) {
      leftDiagonal.push(field[i][i]);
      rightDiagonal.push(field[fieldSize - 1 - i][i]);
    }
    playLines.push(leftDiagonal);
    playLines.push(rightDiagonal);

    let quantityLinesHasStepsOfTwoPlayers = 0;
    for (let i = 0; i < playLines.length; i += 1) {
      const mapOfQuantitySteps = {};
      for (let j = 0; j < playLines[i].length; j += 1) {
        if (playLines[i][j] !== defaultValue) {
          if (!mapOfQuantitySteps[playLines[i][j]]) {
            mapOfQuantitySteps[playLines[i][j]] = 0;
          }
          mapOfQuantitySteps[playLines[i][j]] += 1;
        }
      }

      const players = Object.keys(mapOfQuantitySteps);
      if (players.length > 1) {
        quantityLinesHasStepsOfTwoPlayers += 1;
      } else if (
        players.length === 1
        && mapOfQuantitySteps[players[0]] === fieldSize
      ) {
        return {
          numberOfPlayer: players[0],
          numberOfCombination: i,
        };
      }
    }

    if (quantityLinesHasStepsOfTwoPlayers === playLines.length) {
      return 'Draw!';
    }

    return null;
  }

  checkGameState(gameobject) {
    const win = this.checkWin(this.field, this.fieldSize, this.DEFAULT_VALUE);

    if (win === null) {
      return undefined;
    }

    if (win === 'Draw!') {
      this.view.createMessage('Draw!');
      return false;
    }

    if (gameobject instanceof Computer) {
      this.view.createMessage('You lost');
      this.createLine(win.numberOfCombination);
      return true;
    }
    this.view.createMessage('You won!');
    this.createLine(win.numberOfCombination);
    return true;
  }

  appendElement(element, className, parentElement) {
    element.classList.add(className);
    parentElement.appendChild(element);
  }

  createLine(numberOfCombination) {
    const line = document.createElement('hr');
    this.appendElement(line, `lineCombination${numberOfCombination}`, this.root);
  }

  clearField() {
    for (let i = 0; i < this.fieldSize; i += 1) {
      for (let j = 0; j < this.fieldSize; j += 1) {
        this.field[i][j] = this.DEFAULT_VALUE;
      }
    }
  }
}

export default App;
