import appendElement from './appendElement';

export type AddElementType = {
  nameElement: string;
  className: string;
  parentElement: HTMLElement;
};

const addElement = ({
  nameElement,
  className,
  parentElement,
}: AddElementType): HTMLElement => {
  const element = document.createElement(nameElement);
  appendElement({ element, className, parentElement });

  return element;
};

export default addElement;
