import appendElement from './appendElement.js';

const addElement = (...args) => {
  const [nameElement, className, parentElement] = args;
  const element = document.createElement(nameElement);
  appendElement(element, className, parentElement);

  return element;
};

export default addElement;
