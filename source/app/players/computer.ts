import { DEFAULT_VALUE } from '../constants/constants';
import { configForCheckSetStep } from '../helpers/configForCheckSetStep';
import {
  CoordinatesType,
} from '../types/types';
import type { Game } from '../game';

class Computer {
  public icon: string;
  public game: Game;

  constructor(icon: string, game: Game) {
    this.icon = icon;
    this.game = game;
  }

  getNextStepCoordsFromCoordsOfPlayer(
    coordinates: CoordinatesType,
  ): void {
    const arrLinesWithCoordinates = Object.values(configForCheckSetStep)
      .map(lineConfig => [lineConfig.forward(coordinates, 1), lineConfig.back(coordinates, 1)]);

    const arrCoordinates = arrLinesWithCoordinates.reduce(
      (acc, line) => acc.concat(line),
      [],
    );
    const arrPossibleStepCoordinates = arrCoordinates.filter(([nextX, nextY]) => this.game.field[`${nextX},${nextY}`] === DEFAULT_VALUE);

    const randomIndex = Math.floor(Math.random() * arrPossibleStepCoordinates.length);
    const cellForStep = arrPossibleStepCoordinates[randomIndex];

    this.game.setStep(cellForStep);
  }
}

export { Computer };
