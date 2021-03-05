export type CoordinatesType = [number, number];

export type CursorFunctionType = (
  coordinates: CoordinatesType,
  quantity: number,
) => CoordinatesType;

export type FieldType = { [key: string]: number };

export enum LinesType {
  horizontal,
  vertical,
  diagonal,
  rightDiagonal,
}

export type ConfigForCheckType = {
  [key in LinesType]: {
    forward: CursorFunctionType;
    back: CursorFunctionType;
  };
};

export interface GameInterface {
  activePlayer: number;
  field: Object;
  fieldSize: number;
  players: [];
  stepCounter: number;
  view: Record<string, any>;
  winLength: number;
  initGame: () => void;
  generateField: () => void;
  setNextActivePlayer: () => void;
}

export interface GetPossibleStepCoordinatesArgs {
  coordinates: CoordinatesType;
  quantity: number;
  cursorFunction: CursorFunctionType;
}
