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

  restartGame(action: any, fieldSize: number): ActionButtonConfig {
    return {
      type: MenuElementTypes.action,
      title: 'Restart game',
      action: () => {
        action(fieldSize);
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

  changeFieldSize(action: any): ActionButtonConfig {
    return {
      type: MenuElementTypes.action,
      title: 'Change field size',
      action: () => {
        this.view.inputInit(action);
      },
    };
  }
}

export { MenuButtons };
