import './app.scss';
import { Game } from './game';
import { GameView } from './view/gameView';
import { GameMenu } from './view/gameMenu';
import { MenuElementTypes } from './view/gameMenu';

class App {
  public root: HTMLElement;
  public view!: GameView;
  public game!: Game;
  public menu!: GameMenu;
  public fieldSize: number;

  constructor(FIELD_SIZE: number, root: HTMLElement) {
    this.root = root;
    this.fieldSize = FIELD_SIZE;

    this.initApp();
  }

  initApp() {
    this.view = new GameView(this.root, this.fieldSize);
    this.game = new Game(this.fieldSize, this.view);
    this.menu = new GameMenu(this.root, this.fieldSize, this.view);
  }

  startGame() {
    this.game.initGame(this.fieldSize);
    //this.setConfigProperty('playerOrder', 0);
    this.menu.renderMenu();
    this.menu.initMenu([
      {
        type: MenuElementTypes.action,
        title: 'Restart game',
        action: () => {
          this.restartGame();
        },
      },
      {
        type: MenuElementTypes.subMenu,
        title: 'Select first player',
        children: [
          {
            type: MenuElementTypes.action,
            title: 'Player',
            action: () => {
              this.game.selectPlayer('Player');
            },
          },
          {
            type: MenuElementTypes.action,
            title: 'Computer',
            action: () => {
              this.game.selectPlayer('Computer');
            },
          },
        ],
      },
      {
        type: MenuElementTypes.action,
        title: 'Change field size',
        action: () => {
          this.view.inputFieldSize();
        },
      },
    ]);
  }

  restartGame() {
    this.view.clearField();
    this.game.generateField(this.fieldSize);
  }
}

export { App };
