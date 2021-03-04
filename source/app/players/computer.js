import { DEFAULT_VALUE } from '../constants/constants.js';
import { createConfigForCheckSetStep } from '../helpers/createConfigForCheckSetStep.js';

class Computer {
  constructor(icon, game) {
    this.icon = icon;
    this.game = game;
  }

  getPossibleStepCoordinates(x, y, cursorFunction) {
    const coordinates = [];
    const [nextX, nextY] = cursorFunction(x, y, 1);
    if (this.game.field[`${nextX},${nextY}`] === DEFAULT_VALUE) {
      coordinates.push({ x: nextX, y: nextY });
    }
    return coordinates;
  }

  getCoordinatesFromCoordinatesOfPlayer(x, y) {
    const config = createConfigForCheckSetStep();
    const arrOflinesWithCoordinates = Object.values(config).map((lineConfig) => {
      const stepForwardCoordinates = this.getPossibleStepCoordinates(x, y, lineConfig.forward);
      const stepBackCoordinates = this.getPossibleStepCoordinates(x, y, lineConfig.back);

      return stepForwardCoordinates.concat(stepBackCoordinates);
    });

    const arrWithCoordinates = arrOflinesWithCoordinates
      .reduce((acc, line) => acc.concat(line), []);

    const randomNumber = Math.floor(Math.random() * arrWithCoordinates.length);

    const cellForStep = arrWithCoordinates[randomNumber];
    this.game.setStep(cellForStep.x, cellForStep.y);

    return arrWithCoordinates;
  }
}

export default Computer;
