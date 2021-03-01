const appendElement = (...args) => {
  const [element, className, parentElement] = args;
  element.classList.add(className);
  parentElement.appendChild(element);
};

export default appendElement;
