export type CoordinatesType = [number, number];

export type CursorFunctionType = (
  coordinates: CoordinatesType,
  quantity: number,
) => CoordinatesType;

export type FieldType = { [key: string]: number | null };

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

export type GetPossibleStepCoordinatesArgs = {
  coordinates: CoordinatesType;
  quantity: number;
  cursorFunction: CursorFunctionType;
};

export type ActionType = (coordinates: CoordinatesType) => void;

export type OccupationCellArgs = {
  coordinates: CoordinatesType;
  icon: string;
  numberOfPlayer: number;
};

export type WinObjectType =
  | {
      result: string;
      numberOfPlayer?: number;
      stepCoordinates?: number[][];
    }
  | false;
