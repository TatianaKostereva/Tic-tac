import GameObject from './gameObject.js';

class Computer extends GameObject {
  randomStep() {
    let x;
    let y;

    do {
      x = Math.floor(Math.random() * this.game.fieldSize);
      y = Math.floor(Math.random() * this.game.fieldSize);
    } while (!this.game.setStep(x, y));

    return true;
  }

  initSetStep() {
    return this.randomStep();
  }
}

export default Computer;
