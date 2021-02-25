import { constants } from '../model/constants/constants.js';
import { appendElement } from '../helpers/appendElement.js';

export const createNewTable = (root) => {
  const table = document.createElement('table');
  appendElement(table, 'table', root);

  for (let i = 0; i < constants.MATRIXSIZE; i += 1) {
    const row = document.createElement('tr');
    appendElement(row, 'row', table);

    for (let j = 0; j < constants.MATRIXSIZE; j += 1) {
      const cell = document.createElement('td');
      appendElement(cell, 'cell', row);
      cell.setAttribute('data-x', i);
      cell.setAttribute('data-y', j);
    }
  }
};
