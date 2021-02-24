export const appendElement = (element, className, parentElement) => {
  element.classList.add(className);
  parentElement.appendChild(element);
};
