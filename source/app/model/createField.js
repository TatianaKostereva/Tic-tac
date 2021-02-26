import { DEFAULT_VALUE, MATRIX_SIZE } from './constants/constants.js';

const createField = () => {
  const field = [];

  for (let i = 0; i < MATRIX_SIZE; i += 1) {
    field[i] = [];
    for (let j = 0; j < MATRIX_SIZE; j += 1) {
      field[i][j] = DEFAULT_VALUE;
    }
  }

  return field;
};

export default createField;
