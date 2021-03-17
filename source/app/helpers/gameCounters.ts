import { eventType } from '../types/types';

class GameCounters {
  public stepCounter: any;

  constructor() {
    this.stepCounter = {};
  }

  getQuantitySteps = (event: eventType): void => {
    if (this.stepCounter[event.playerIndex] === undefined) {
      this.stepCounter[event.playerIndex] = 0;
    }
    this.stepCounter[event.playerIndex] += 1;
    return this.stepCounter;
  };
}

export { GameCounters };
