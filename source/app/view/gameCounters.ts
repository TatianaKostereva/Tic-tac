class GameCounters {
  public stepCounter: number;

  constructor(stepCounter: number) {
    this.stepCounter = stepCounter;
  }

  renderCounters() {
    console.log(this.stepCounter);
  }
}

export { GameCounters };
