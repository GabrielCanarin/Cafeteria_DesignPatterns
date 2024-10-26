import { OrderObserver } from './OrderObserver';

export class OrderSubject {
  private observers: OrderObserver[] = [];

  addObserver(observer: OrderObserver) {
    this.observers.push(observer);
  }

  removeObserver(observer: OrderObserver) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(orderStatus: string) {
    this.observers.forEach(observer => observer.update(orderStatus));
  }
}