import { constants } from './constants/constants.js';

export const initGame = () => {
  const twoDimArray = new Array(constants.MATRIXSIZE).fill([]);
  const matrix = twoDimArray.map(() => new Array(constants.MATRIXSIZE).fill(0));
  return matrix;
};
