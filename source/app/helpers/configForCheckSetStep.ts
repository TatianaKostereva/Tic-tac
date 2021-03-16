import { ConfigForCheckType, LinesType } from '../types/types';

export const configForCheckSetStep: ConfigForCheckType = {
  [LinesType.horizontal]: {
    forward([x, y], quantity) {
      y += quantity;
      return [x, y];
    },
    back([x, y], quantity) {
      y -= quantity;
      return [x, y];
    },
  },
  [LinesType.vertical]: {
    forward([x, y], quantity) {
      x += quantity;
      return [x, y];
    },
    back([x, y], quantity) {
      x -= quantity;
      return [x, y];
    },
  },
  [LinesType.diagonal]: {
    forward([x, y], quantity) {
      x += quantity;
      y += quantity;
      return [x, y];
    },
    back([x, y], quantity) {
      x -= quantity;
      y -= quantity;
      return [x, y];
    },
  },
  [LinesType.rightDiagonal]: {
    forward([x, y], quantity) {
      x -= quantity;
      y += quantity;
      return [x, y];
    },
    back([x, y], quantity) {
      x += quantity;
      y -= quantity;
      return [x, y];
    },
  },
};
