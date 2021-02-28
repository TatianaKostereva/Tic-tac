class GameObject {
  constructor(icon, numberOfPlayer) {
    this.icon = icon;
    this.numberOfPlayer = numberOfPlayer;
  }

  step(x, y, field, fieldSize, view, defaultValue) {
    if (field[x][y] !== defaultValue) {
      return;
    }
    field[x][y] = this.icon;
    console.log(this.numberOfPlayer);
    view.occupationCell(x, y, this.icon, this.numberOfPlayer);
  }
}

export default GameObject;
