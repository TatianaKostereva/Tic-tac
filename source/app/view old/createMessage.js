import { appendElement } from '../helpers/appendElement.js';

export const createMessage = (text, root) => {
  const message = document.createElement('div');
  appendElement(message, 'message', root);
  message.innerText = `${text}`;
};
