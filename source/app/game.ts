import './app.scss';
import Computer from './players/computer';
import Player from './players/player';
import { createConfigForCheckSetStep } from './helpers/createConfigForCheckSetStep';
import { DEFAULT_VALUE, WIN_LENGTH } from './constants/constants';
import type ViewType from './view/gameView';
import type PlayerType from './players/player';
import type ComputerType from './players/computer';
import { CoordinatesType, CursorFunctionType, FieldType, WinObjectType } from './helpers/interfaces';

class Game {
  public activePlayer: number;
  public field: FieldType;
  public fieldSize: number;
  public players: [PlayerType, ComputerType];
  public stepCounter: number;
  public view: ViewType;
  public winLength: number;

  constructor(FIELD_SIZE: number, view: ViewType) {
    this.players = [new Player('X'), new Computer('O', this)];
    this.stepCounter = 0;
    this.activePlayer = 0;
    this.winLength = WIN_LENGTH;
    this.field = {};
    this.fieldSize = FIELD_SIZE;
    this.view = view;
  }

  initGame() {
    this.generateField();
    this.view.renderField(this.setStep.bind(this));
  }

  generateField() {
    for (let i = 0; i < this.fieldSize; i += 1) {
      for (let j = 0; j < this.fieldSize; j += 1) {
        this.field[`${i},${j}`] = DEFAULT_VALUE;
      }
    }
  }

  setNextActivePlayer(coordinates: CoordinatesType): void {
    this.activePlayer = this.activePlayer === this.players.length - 1 ? 0 : this.activePlayer + 1;

    if (this.activePlayer === 1) {
      this.players[this.activePlayer].getCoordinatesFromCoordinatesOfPlayer(
        coordinates,
      );
    }
  }

  setStep(coordinates: CoordinatesType): Boolean {
    const [x, y] = coordinates;
    if (this.field[`${x},${y}`] !== DEFAULT_VALUE) {
      return false;
    }
    this.stepCounter += 1;
    const { icon } = this.players[this.activePlayer];

    this.field[`${x},${y}`] = this.activePlayer;

    this.view.occupationCell({
      coordinates,
      icon,
      numberOfPlayer: this.activePlayer,
    });

    const win: WinObjectType | null = this.checkWin(coordinates);
    if (win) {
      this.stepCounter = 0;
      this.finishGame(win);
    } else {
      this.setNextActivePlayer(coordinates);
    }

    return true;
  }

  getStepCoordinates(coordinates: CoordinatesType, cursorFunction: CursorFunctionType): CoordinatesType[] {
    const coordinatesArr: CoordinatesType[] = [];
    for (let i = 1; i < this.winLength; i += 1) {
      const [nextX, nextY] = cursorFunction(coordinates, i);
      if (this.field[`${nextX},${nextY}`] === this.activePlayer) {
        coordinatesArr.push([nextX, nextY]);
      }
    }
    return coordinatesArr;
  }

  getLinesOfStepsCoordinates(coordinates: CoordinatesType): CoordinatesType[][] {
    const config = createConfigForCheckSetStep();
    const lines = Object.values(config).map(lineConfig => {
      const stepForwardCoordinates = this.getStepCoordinates(
        coordinates,
        lineConfig.forward,
      );
      const stepBackCoordinates = this.getStepCoordinates(
        coordinates,
        lineConfig.back,
      );

      return [coordinates].concat(stepForwardCoordinates, stepBackCoordinates);
    });
    return lines;
  }

  checkWin(coordinates: CoordinatesType): WinObjectType {
    const linesOfStepsCoordinates = this.getLinesOfStepsCoordinates(
      coordinates,
    );
    const winLine = linesOfStepsCoordinates.find(
      line => line.length === this.winLength,
    );

    if (winLine) {
      return {
        numberOfPlayer: this.activePlayer,
        stepCoordinates: winLine,
        result: 'Victory',
      };
    }

    if (this.stepCounter === this.fieldSize * this.fieldSize) {
      return {
        numberOfPlayer: this.activePlayer,
        stepCoordinates: [],
        result: 'Draw',
      };
    }

    return null;
  }

  finishGame(win: WinObjectType): Boolean | undefined {
    if (win === null) {
      return undefined;
    }

    if (win.result === 'Draw!') {
      this.view.createMessage('Draw!');
      return false;
    }

    if (this.activePlayer === 1) {
      this.view.createMessage('You lost');
      this.view.createLine(win.stepCoordinates);
      return true;
    }
    this.view.createMessage('You won!');
    this.view.createLine(win.stepCoordinates);
    return true;
  }
}

export default Game;
