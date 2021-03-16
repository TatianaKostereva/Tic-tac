import './app.scss';
import { Computer } from './players/computer';
import { Player } from './players/player';
import { configForCheckSetStep } from './helpers/configForCheckSetStep';
import { DEFAULT_VALUE, WIN_LENGTH } from './constants/constants';
import type { GameView } from './view/gameView';
import {
  CoordinatesType, CursorFunctionType, FieldType, WinObjectType,
} from './types/types';
import { GameCounters } from './view/gameCounters';

class Game {
  public activePlayer: number;
  public field: FieldType;
  public fieldSize: number;
  public players: [Player, Computer];
  public stepCounter: number;
  public view: GameView;
  public winLength: number;

  constructor(FIELD_SIZE: number, view: GameView) {
    this.players = [new Player('X'), new Computer('O', this)];
    this.stepCounter = 0;
    this.view = view;
    this.activePlayer = 0;
    this.winLength = WIN_LENGTH;
    this.field = {};
    this.fieldSize = FIELD_SIZE;
    this.playerCounter = new GameCounters(this.stepCounter);
  }

  initGame(fieldSize: number) {
    this.generateField(fieldSize);
    this.view.renderField(fieldSize, this.setStep.bind(this));
  }

  generateField(fieldSize: number) {
    for (let i = 0; i < fieldSize; i += 1) {
      for (let j = 0; j < fieldSize; j += 1) {
        this.field[`${i},${j}`] = DEFAULT_VALUE;
      }
    }
  }

  setNextActivePlayer(coordinates: CoordinatesType): void {
    this.activePlayer = this.activePlayer === this.players.length - 1 ? 0 : this.activePlayer + 1;

    if (this.activePlayer === 1) {
      this.players[this.activePlayer].getNextStepCoordsFromCoordsOfPlayer(
        coordinates,
      );
    }
  }

  setStep(coordinates: CoordinatesType): void {
    const [x, y] = coordinates;
    if (this.field[`${x},${y}`] !== DEFAULT_VALUE) {
      return;
    }
    this.stepCounter += 1;
    console.log(this.playerCounter);
    
    const { icon } = this.players[this.activePlayer];

    this.field[`${x},${y}`] = this.activePlayer;

    this.view.occupationCell({
      coordinates,
      icon,
      numberOfPlayer: this.activePlayer,
    });

    const win: WinObjectType = this.checkWin(coordinates);
    if (win) {
      this.stepCounter = 0;
      this.finishGame(win);
    } else {
      this.setNextActivePlayer(coordinates);
    }
  }

  getStepCoordinates(
    coordinates: CoordinatesType,
    cursorFunction: CursorFunctionType,
  ): CoordinatesType[] {
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
    const lines = Object.values(configForCheckSetStep).map(lineConfig => {
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
      const indexOfWinLine = linesOfStepsCoordinates.indexOf(winLine);
      return {
        result: 'Victory',
        indexOfWinLine: indexOfWinLine,
        numberOfPlayer: this.activePlayer,
        stepCoordinates: winLine,
      };
    }

    if (this.stepCounter === this.fieldSize * this.fieldSize) {
      return {
        result: 'Draw',
      };
    }

    return false;
  }

  finishGame(win: WinObjectType): void {
    if (win === false) {
      return;
    }

    if (win.result === 'Draw') {
      this.view.createMessage(win.result);
    }

    if (win.stepCoordinates === undefined || win.indexOfWinLine === undefined) {
      return;
    }

    const messageText = (this.activePlayer === 1) ? 'You lost' : 'You won!';
    this.view.createMessage(messageText);
    this.view.createLine(win.stepCoordinates, win.indexOfWinLine);
  }

  selectPlayer(player: string): void {
    if (player === 'Player') {
      return;
    }

    if (player === 'Computer') {
      this.setNextActivePlayer([0,0]);
    }
  }
}

export { Game };
