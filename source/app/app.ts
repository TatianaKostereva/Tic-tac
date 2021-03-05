import './app.scss';
import Game from './game';
import GameView from './view/gameView';
import type ViewType from './view/gameView';
import type GameType from './game';

class App {
  public root: HTMLElement;
  public view: ViewType;
  public game: GameType;

  constructor(FIELD_SIZE: number, root: HTMLElement) {
    this.root = root;
    this.view = new GameView(this.root, FIELD_SIZE);
    this.game = new Game(FIELD_SIZE, this.view);
    this.view.renderButton('Restart game', this.restartGame.bind(this));
  }

  startGame() {
    this.game.initGame();
  }

  restartGame() {
    this.view.clearField();
    this.game.generateField();
  }
}

export default App;
