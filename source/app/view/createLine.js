import { appendElement } from '../helpers/appendElement.js';

export const createLine = (root, className, i = -1) => {
  const line = document.createElement('hr');
  appendElement(line, 'line', root);
  if (i !== -1) {
    line.classList.add(className + i);
  } else {
    line.classList.add(className);
  }

  return line;
};
