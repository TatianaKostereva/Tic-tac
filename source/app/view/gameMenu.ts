import { addElement } from '../helpers/addElement';
import { GameView } from './gameView';
import {
  MenuElementTypes,
  ActionButtonConfig,
  SubMenuConfig,
  TMenuElement,
} from '../types/types';

class GameMenu {
  public root: HTMLElement;
  public fieldSize: number;
  private menuNode!: HTMLElement;
  private menuContent!: HTMLElement;
  private subMenuElement!: HTMLElement;
  public view: GameView;

  constructor(root: HTMLElement, FIELD_SIZE: number, view: GameView) {
    this.root = root;
    this.fieldSize = FIELD_SIZE;
    this.view = view;
  }

  renderMenu(): void {
    this.menuNode = addElement({
      nameElement: 'div',
      className: 'dropdownMenu',
      parentElement: this.root,
    });
    const dropButton = addElement({
      nameElement: 'button',
      className: 'dropButton',
      parentElement: this.menuNode,
      innerText: 'Menu',
    });
    this.menuContent = addElement({
      nameElement: 'div',
      className: 'dropdownContent',
      parentElement: this.menuNode,
    });

    dropButton.addEventListener('click', event => {
      this.menuContent.classList.toggle('show');
    });
  }

  initMenu(config: TMenuElement[]): void {
    if (this.menuNode) {
      this.menuNode.remove();
    }
    this.renderMenu();
    config.forEach(item => {
      switch (item.type) {
        case MenuElementTypes.action:
          {
            this.renderButton(item);
          }
          break;
        case MenuElementTypes.subMenu: {
          this.renderSubMenu(item);
        }
      }
    });
  }

  renderButton(
    button: ActionButtonConfig,
    parent = this.menuContent,
  ): HTMLElement {
    const rowMenuElement = addElement({
      nameElement: 'div',
      className: 'menu-content_container',
      parentElement: parent,
    });

    const buttonElement = addElement({
      nameElement: 'a',
      className: 'menu-content',
      parentElement: rowMenuElement,
      innerText: button.title,
    });

    buttonElement.addEventListener('click', () => {
      this.view.deleteMessage();
      this.view.deleteLine();

      button.action();
      this.menuContent.classList.remove('show');
      this.subMenuElement.classList.remove('showMore');
    });

    return rowMenuElement;
  }

  renderSubMenu(subMenu: SubMenuConfig) {
    const rowElement = this.renderButton({
      type: MenuElementTypes.action,
      title: subMenu.title,
      action: () => {},
    });

    this.subMenuElement = addElement({
      nameElement: 'div',
      className: 'subMenu-content',
      parentElement: rowElement,
    });

    rowElement.addEventListener('mouseenter', () => {
      this.subMenuElement.classList.toggle('showMore');
    });

    subMenu.children.forEach((button: ActionButtonConfig) => {
      this.renderButton(button, this.subMenuElement);
    });
  }
}

export { GameMenu };
