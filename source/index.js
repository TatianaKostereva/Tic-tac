import './index.scss';
import App from './app/app.js';
import { FIELD_SIZE } from './app/model/constants/constants.js';

const root = document.querySelector('.root');

const game = new App(FIELD_SIZE, root);
game.init();
