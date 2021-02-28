import GameObject from './gameObject.js';

class Computer extends GameObject {
  randomStep(x, y, field, fieldSize, view, defaultValue) {
    let i = Math.floor(Math.random() * fieldSize);
    let j = Math.floor(Math.random() * fieldSize);
    let n = 0;
    const numberOfStep = (fieldSize * fieldSize - 1) / 2;

    while (field[i][j] !== defaultValue && n <= numberOfStep) {
      i = Math.floor(Math.random() * fieldSize);
      j = Math.floor(Math.random() * fieldSize);
      n += 1;
    }

    field[i][j] = this.icon;
    view.occupationCell(i, j, this.icon, this.numberOfPlayer);
  }
}

export default Computer;
