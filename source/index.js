import './index.scss';
import App from './app/app';
import { FIELD_SIZE } from './app/constants/constants';

const root = document.querySelector('.root');

const game = new App(FIELD_SIZE, root);
game.startGame();
