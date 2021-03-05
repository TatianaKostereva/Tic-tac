export type AppendElementType = {
  element: HTMLElement;
  className: string;
  parentElement: HTMLElement;
};

const appendElement = ({
  element,
  className,
  parentElement,
}: AppendElementType): void => {
  element.classList.add(className);
  parentElement.appendChild(element);
};

export default appendElement;
