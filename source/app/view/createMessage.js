import { appendElement } from '../helpers/appendElement.js';

const createMessage = (text, root) => {
  const message = document.createElement('div');
  appendElement(message, 'message', root);
  message.innerText = `${text}`;
};

export default createMessage;
