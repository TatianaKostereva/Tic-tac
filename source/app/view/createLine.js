import { appendElement } from '../helpers/appendElement.js';

const createLine = (root, numberOfCombination) => {
  const line = document.createElement('hr');
  appendElement(line, `lineCombination${numberOfCombination}`, root);

  return line;
};

export default createLine;
