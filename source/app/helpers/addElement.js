import appendElement from './appendElement';

const addElement = (...args) => {
  const [nameElement, className, parentElement] = args;
  const element = document.createElement(nameElement);
  appendElement(element, className, parentElement);

  return element;
};

export default addElement;
