import { addElement } from '../helpers/addElement';
import { GameView } from './gameView';

export enum MenuElementTypes {
  action = 'action',
  subMenu = 'subMenu',
}

interface MenuBaseElement {
  type: MenuElementTypes;
  title: string;
}

interface ActionButtonConfig extends MenuBaseElement {
  type: MenuElementTypes.action;
  action: () => void;
}

interface SubMenuConfig extends MenuBaseElement {
  type: MenuElementTypes.subMenu;
  children: ActionButtonConfig[];
}

type TMenuElement = SubMenuConfig | ActionButtonConfig;

class GameMenu {
  public root: HTMLElement;
  public fieldSize: number;
  private menuNode!: HTMLElement;
  private menuContent!: HTMLElement;
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
      this.view.clearMessage();
      this.view.clearLine();

      button.action();
    });

    return rowMenuElement;
  }

  renderSubMenu(subMenu: SubMenuConfig) {
    let subMenuElement: HTMLElement;

    const rowElement = this.renderButton({
      type: MenuElementTypes.action,
      title: subMenu.title,
      action: () => {
        subMenuElement.classList.toggle('showMore');
      },
    });

    subMenuElement = addElement({
      nameElement: 'div',
      className: 'subMenu-content',
      parentElement: rowElement,
    });

    subMenu.children.forEach((button: ActionButtonConfig) => {
      this.renderButton(button, subMenuElement);
    });
  }
}

export { GameMenu };
