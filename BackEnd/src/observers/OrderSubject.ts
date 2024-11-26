import { OrderObserver } from "./OrderObserver";

export class OrderSubject {
  private observers: OrderObserver[] = [];

  addObserver(observer: OrderObserver) {
    console.log("🔗 Observador adicionado:", observer.constructor.name);
    this.observers.push(observer);
  }

  removeObserver(observer: OrderObserver) {
    console.log("❌ Observador removido:", observer.constructor.name);
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(orderStatus: string) {
    console.log("📢 Notificando observadores...");
    this.observers.forEach((observer) => observer.update(orderStatus));
  }
}
