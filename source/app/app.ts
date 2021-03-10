import './app.scss';
import { Game } from './game';
import { GameView } from './view/gameView';

class App {
  public root: HTMLElement;
  public view!: GameView;
  public game!: Game;
  public fieldSize: number;

  constructor(FIELD_SIZE: number, root: HTMLElement) {
    this.root = root;
    this.fieldSize = FIELD_SIZE;

    this.initApp();
  }

  initApp() {
    this.view = new GameView(this.root, this.fieldSize);
    this.game = new Game(this.fieldSize, this.view);
    this.view.addButton('Restart game', () => this.restartGame());
  }

  startGame() {
    this.game.initGame();
  }

  restartGame() {
    this.view.clearField();
    this.game.generateField();
  }
}

export { App };
