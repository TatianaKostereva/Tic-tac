const deleteElement = (root: HTMLElement, className: string): void => {
  const element = root.querySelector(`.${className}`);
  element?.remove();
};

export { deleteElement };
