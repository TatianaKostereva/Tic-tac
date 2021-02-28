class View {
  constructor(root) {
    this.root = root;
  }

  createMessage(messageText) {
    const message = document.createElement('div');
    this.appendElement(message, 'message', this.root);
    message.innerText = `${messageText}`;
  }

  restart(cellElement) {
    for (let i = 0; i < cellElement.length; i += 1) {
      cellElement[i].innerText = '';
      cellElement[i].classList.remove('cell-1');
      cellElement[i].classList.remove('cell-2');
    }
  }

  appendElement(element, className, parentElement) {
    element.classList.add(className);
    parentElement.appendChild(element);
  }

  renderField(fieldSize) {
    const field = document.createElement('table');
    this.appendElement(field, 'field', this.root);

    for (let i = 0; i < fieldSize; i += 1) {
      const row = document.createElement('tr');
      this.appendElement(row, 'row', field);

      for (let j = 0; j < fieldSize; j += 1) {
        const cell = document.createElement('td');
        this.appendElement(cell, 'cell', row);
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);
      }
    }
  }

  renderButton() {
    const button = document.createElement('button');
    this.appendElement(button, 'button', this.root);
    button.innerText = 'Restart game';
  }

  occupationCell(x, y, icon, numberOfPlayer) {
    const occupationCell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
    occupationCell.innerText = icon;
    occupationCell.classList.add(`cell-${numberOfPlayer}`);
  }
}

export default View;
