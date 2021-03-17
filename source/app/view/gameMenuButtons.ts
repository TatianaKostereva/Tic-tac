import {
  ActionButtonConfig,
  MenuElementTypes,
  SubMenuConfig,
} from '../types/types';
import { Game } from '../game';
import { GameView } from './gameView';

class MenuButtons {
  public view: GameView;
  public game: Game;

  constructor(view: GameView, game: Game) {
    this.view = view;
    this.game = game;
  }

  restartGame(callback: (param?: any) => any): ActionButtonConfig {
    return {
      type: MenuElementTypes.action,
      title: 'Restart game',
      action: () => {
        this.view.deleteMessage();
        this.view.deleteLine();
        callback();
      },
    };
  }

  selectFirstPlayer(): SubMenuConfig {
    return {
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
    };
  }

  changeFieldSize(callback: (param?: any) => any): ActionButtonConfig {
    return {
      type: MenuElementTypes.action,
      title: 'Change field size',
      action: () => {
        this.view.inputInit(callback);
      },
    };
  }
}

export { MenuButtons };
