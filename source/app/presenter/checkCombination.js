import { constants } from '../model/constants/constants.js';
import { createMessage } from '../view/createMessage.js';
import { createLine } from '../view/createLine.js';

export const checkCombination = (checkField, playerName, root, className, i = -1) => {
  if (checkField === constants.MATRIXSIZE) {
    createMessage(`The ${playerName} wins!`, root);
    createLine(root, className, i);
  }
};
