import { MATRIX_SIZE } from '../model/constants/constants.js';
import { appendElement } from '../helpers/appendElement.js';

const renderField = (root) => {
  const field = document.createElement('table');
  appendElement(field, 'field', root);

  for (let i = 0; i < MATRIX_SIZE; i += 1) {
    const row = document.createElement('tr');
    appendElement(row, 'row', field);

    for (let j = 0; j < MATRIX_SIZE; j += 1) {
      const cell = document.createElement('td');
      appendElement(cell, 'cell', row);
      cell.setAttribute('data-x', i);
      cell.setAttribute('data-y', j);
    }
  }

  return field;
};

export default renderField;
