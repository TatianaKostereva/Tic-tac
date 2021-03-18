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
    const arrLinesWithCoordinatesForOneStep = Object.values(configForCheckSetStep)
      .map(lineConfig => [lineConfig.forward(coordinates, 1), lineConfig.back(coordinates, 1)]);

    const arrLinesWithCoordinatesForTwoStep = Object.values(configForCheckSetStep)
      .map(lineConfig => [lineConfig.forward(coordinates, 2), lineConfig.back(coordinates, 2)]);

    const arrCoordinatesForOneStep = arrLinesWithCoordinatesForOneStep.reduce(
      (acc, line) => acc.concat(line),
      [],
    );

    const arrCoordinatesForTwoStep = arrLinesWithCoordinatesForTwoStep.reduce(
      (acc, line) => acc.concat(line),
      [],
    );

    const arrCoordinates = arrCoordinatesForOneStep.concat(arrCoordinatesForTwoStep);

    const arrPossibleStepCoordinates = arrCoordinates.filter(([nextX, nextY]) => this.game.field[`${nextX},${nextY}`] === DEFAULT_VALUE);

    const randomIndex = Math.floor(Math.random() * arrPossibleStepCoordinates.length);
    const cellForStep = arrPossibleStepCoordinates[randomIndex];

    this.game.setStep(cellForStep);
  }
}

export { Computer };
