import './app.scss';
import Game from './game.js';
import GameView from './view/gameView.js';

class App {
  constructor(FIELD_SIZE, root) {
    this.root = root;
    this.view = new GameView(this.root);
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
