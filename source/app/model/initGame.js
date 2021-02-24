import { constants } from './constants/constants.js';

export const initGame = () => {
  const array = new Array(constants.SIZE).fill([]);
  const game = array.map(() => new Array(constants.SIZE).fill(0));
  return game;
};
