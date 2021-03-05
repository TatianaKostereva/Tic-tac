import './app.scss';
import Game from './game';
import GameView from './view/gameView';

class App {
  constructor(FIELD_SIZE, root) {
    this.root = root;
    this.view = new GameView(this.root, FIELD_SIZE);
    this.game = new Game(FIELD_SIZE, this.view);
    this.view.renderButton('Restart game', this.restartGame.bind(this));
  }

  startGame(FIELD_SIZE) {
    this.game.initGame(FIELD_SIZE);
  }

  restartGame() {
    this.view.clearField();
    this.game.generateField();
  }
}

export default App;
