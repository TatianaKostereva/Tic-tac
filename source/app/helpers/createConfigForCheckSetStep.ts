type CursorFunctionArgsType = { x: number; y: number; quantity: number };
type CursorFunctionReturnType = [number, number];

export const createConfigForCheckSetStep = () => {
  const config = {
    horizontal: {
      forward({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        y += quantity;
        return [x, y];
      },
      back({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        y -= quantity;
        return [x, y];
      },
    },
    vertical: {
      forward({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        x += quantity;
        return [x, y];
      },
      back({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        x -= quantity;
        return [x, y];
      },
    },
    diagonal: {
      forward({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        x += quantity;
        y += quantity;
        return [x, y];
      },
      back({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        x -= quantity;
        y -= quantity;
        return [x, y];
      },
    },
    rightDiagonal: {
      forward({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        x -= quantity;
        y += quantity;
        return [x, y];
      },
      back({x, y, quantity}: CursorFunctionArgsType): CursorFunctionReturnType {
        x += quantity;
        y -= quantity;
        return [x, y];
      },
    },
  };

  return config;
};
