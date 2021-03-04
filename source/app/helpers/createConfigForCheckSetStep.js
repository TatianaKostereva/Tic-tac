export const createConfigForCheckSetStep = () => {
  const config = {
    horizontal: {
      forward(x, y, quantity) {
        y += quantity;
        return [x, y];
      },
      back(x, y, quantity) {
        y -= quantity;
        return [x, y];
      },
    },
    vertical: {
      forward(x, y, quantity) {
        x += quantity;
        return [x, y];
      },
      back(x, y, quantity) {
        x -= quantity;
        return [x, y];
      },
    },
    diagonal: {
      forward(x, y, quantity) {
        x += quantity;
        y += quantity;
        return [x, y];
      },
      back(x, y, quantity) {
        x -= quantity;
        y -= quantity;
        return [x, y];
      },
    },
    rightDiagonal: {
      forward(x, y, quantity) {
        x -= quantity;
        y += quantity;
        return [x, y];
      },
      back(x, y, quantity) {
        x += quantity;
        y -= quantity;
        return [x, y];
      },
    },
  };

  return config;
};
