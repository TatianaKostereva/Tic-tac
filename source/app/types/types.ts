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

export type ActionType = (coordinates: CoordinatesType) => void;

export type OccupationCellArgs = {
  coordinates: CoordinatesType;
  icon: string;
  numberOfPlayer: number;
};

export type WinObjectType =
  | {
      result: string;
      indexOfWinLine?: number;
      numberOfPlayer?: number;
      stepCoordinates?: number[][];
    }
  | false;

export enum MenuElementTypes {
  action = 'action',
  subMenu = 'subMenu',
}

export interface MenuBaseElement {
  type: MenuElementTypes;
  title: string;
}

export interface ActionButtonConfig extends MenuBaseElement {
  type: MenuElementTypes.action;
  action: () => void;
}

export interface SubMenuConfig extends MenuBaseElement {
  type: MenuElementTypes.subMenu;
  children: ActionButtonConfig[];
}

export type TMenuElement = SubMenuConfig | ActionButtonConfig;

export type stepCounterType = {
  '0'?: number;
  '1'?: number;
};

export type eventType = {
  type: string;
  playerIndex: number;
  coords: number[];
};
