class EventObserver {
  public observers: any[] = [];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: any) {
    this.observers.push(fn);
  }

  unsubscribe(fn: any) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  addEvent(data: {}) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

export { EventObserver };
