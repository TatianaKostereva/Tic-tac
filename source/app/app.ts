import { Game } from './game';
import { GameView } from './view/gameView';
import { GameMenu } from './view/gameMenu';
import { MenuButtons } from './view/gameMenuButtons';

import './styles/app.scss';

class App {
  public root: HTMLElement;
  public view!: GameView;
  public game!: Game;
  public menu!: GameMenu;
  public fieldSize: number;
  public buttons!: MenuButtons;

  constructor(FIELD_SIZE: number, root: HTMLElement) {
    this.root = root;
    this.fieldSize = FIELD_SIZE;

    this.initApp();
  }

  initApp() {
    this.view = new GameView(this.root, this.fieldSize);
    this.game = new Game(this.fieldSize, this.view);
    this.menu = new GameMenu(this.root, this.view);
  }

  startGame = (fieldSize: number = this.fieldSize) => {
    this.game.initGame(fieldSize);
    this.menu.renderMenu();

    this.buttons = new MenuButtons(this.view, this.game);

    this.menu.initMenu([
      this.buttons.restartGame(this.restartGame),
      this.buttons.selectFirstPlayer(),
      this.buttons.changeFieldSize(this.changeFieldSize),
    ]);
  };

  changeFieldSize = (fieldSize: number) => {
    this.fieldSize = fieldSize;
    this.restartGame();
  };

  restartGame = () => {
    this.game.generateField(this.fieldSize);
    this.view.deleteField();

    this.view.deleteMenu();
    this.view.deleteInput();
    this.startGame(this.fieldSize);
  };
}

export { App };
