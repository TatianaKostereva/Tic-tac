import './index.scss';
import { App } from './app/app';
import { FIELD_SIZE } from './app/constants/constants';

const root: HTMLElement | null = document.querySelector('.root');

if (root) {
  const game = new App(FIELD_SIZE, root);
  game.startGame();
} else {
  throw new Error('Root element is null');
}
