import { addElement } from '../helpers/addElement';
import { stepCounterType } from '../types/types';

class GameCountersView {
  public root: HTMLElement;
  public counter: stepCounterType;

  constructor(root: HTMLElement, counter: stepCounterType) {
    this.root = root;
    this.counter = counter;
  }

  renderCounters(name: string) {
    const counterContainer = addElement({
      nameElement: 'div',
      className: `counter_container-${name.toLowerCase()}`,
      parentElement: this.root,
    });

    const playerName = addElement({
      nameElement: 'p',
      className: 'playerName',
      parentElement: counterContainer,
      innerText: name,
    });

    let text = name === 'Player' ? this.counter[0] : this.counter[1];
    if (text === undefined) {
      text = 0;
    }

    const counterField = addElement({
      nameElement: 'p',
      className: 'counter',
      parentElement: counterContainer,
      innerText: text?.toString(),
    });
  }
}

export { GameCountersView };
