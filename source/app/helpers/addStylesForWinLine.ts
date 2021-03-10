export type addStylesForWinLineType = {
  line: HTMLElement;
  lengthOfLine: number;
  top: number;
  left: number;
  degOfRotate?: number;
};

export const addStylesForWinLine = ({
  line,
  lengthOfLine,
  top,
  left,
  degOfRotate,
}: addStylesForWinLineType): void => {
  line.style.setProperty('width', `${lengthOfLine}px`);
  line.style.setProperty('top', `${top}px`);
  line.style.setProperty('left', `${left}px`);
  if (degOfRotate) {
    line.style.setProperty('transform', `rotate(${degOfRotate}deg)`);
  }
};
