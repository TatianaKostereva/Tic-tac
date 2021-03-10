export const sortCoordinates = (array: number[][]) => {
  return array.sort((a, b) => {
    if (
      (a[0] === b[0] && a[1] < b[1]) ||
      (a[0] < b[0] && a[1] === b[1]) ||
      (a[0] < b[0] && a[1] > b[1]) ||
      (a[0] < b[0] && a[1] < b[1])
    ) {
      return -1;
    }
    return 1;
  });
};
