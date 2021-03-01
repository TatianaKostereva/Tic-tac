import './app.scss';
import Computer from './players/computer.js';
import GameObject from './players/gameObject.js';
import { DEFAULT_VALUE } from './constants/constants.js';

class Game {
  constructor(FIELD_SIZE, view) {
    this.players = [
      new GameObject('X', this),
      new Computer('O', this),
    ];
    this.activePlayer = -1;
    this.field = [];
    this.fieldSize = FIELD_SIZE;
    this.view = view;
  }

  initGame() {
    this.generateField();
    this.setNextActivePlayer();
    this.view.renderField(this.field, this.setStep.bind(this));
  }

  generateField() {
    for (let i = 0; i < this.fieldSize; i += 1) {
      this.field[i] = [];
      for (let j = 0; j < this.fieldSize; j += 1) {
        this.field[i][j] = DEFAULT_VALUE;
      }
    }
  }

  setNextActivePlayer() {
    this.activePlayer = (this.activePlayer === this.players.length - 1) ? 0 : this.activePlayer + 1;
    this.players[this.activePlayer].initSetStep();
  }

  setStep(x, y) {
    if (this.field[x][y] !== DEFAULT_VALUE) {
      return false;
    }
    const { icon } = this.players[this.activePlayer];

    this.field[x][y] = icon;
    this.view.occupationCell(x, y, icon, this.activePlayer);
    if (this.checkWin()) {
      const win = this.checkWin();
      this.finishGame(win);
    } else {
      this.setNextActivePlayer();
    }

    return true;
  }

  checkWin() {
    const playLines = [];

    for (let i = 0; i < this.fieldSize; i += 1) {
      const row = [];
      const column = [];
      for (let j = 0; j < this.fieldSize; j += 1) {
        row.push(this.field[i][j]);
        column.push(this.field[j][i]);
      }
      playLines.push(row);
      playLines.push(column);
    }

    const leftDiagonal = [];
    const rightDiagonal = [];
    for (let i = 0; i < this.fieldSize; i += 1) {
      leftDiagonal.push(this.field[i][i]);
      rightDiagonal.push(this.field[this.fieldSize - 1 - i][i]);
    }
    playLines.push(leftDiagonal);
    playLines.push(rightDiagonal);

    let quantityLinesHasStepsOfTwoPlayers = 0;
    for (let i = 0; i < playLines.length; i += 1) {
      const mapOfQuantitySteps = {};
      for (let j = 0; j < playLines[i].length; j += 1) {
        if (playLines[i][j] !== DEFAULT_VALUE) {
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
        && mapOfQuantitySteps[players[0]] === this.fieldSize
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

  finishGame(win) {
    if (win === null) {
      return undefined;
    }

    if (win === 'Draw!') {
      this.view.createMessage('Draw!');
      return false;
    }

    if (this.players[this.activePlayer] instanceof Computer) {
      this.view.createMessage('You lost');
      this.view.createLine(win.numberOfCombination);
      return true;
    }
    this.view.createMessage('You won!');
    this.view.createLine(win.numberOfCombination);
    return true;
  }
}

export default Game;
