import { appendElement } from './appendElement';

export type AddElementType = {
  nameElement: string;
  className: string;
  parentElement: HTMLElement;
  innerText?: string;
};

const addElement = ({
  nameElement,
  className,
  parentElement,
  innerText,
}: AddElementType): HTMLElement => {
  const element = document.createElement(nameElement);
  appendElement({ element, className, parentElement });
  if (innerText) {
    element.innerText = innerText;
  }
  return element;
};

export { addElement };
