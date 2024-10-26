import { OrderSubject } from '../observers/OrderSubject';

export class OrderService {
  private orderSubject = new OrderSubject();

  placeOrder(item: string, price: number) {
    console.log(`Pedido realizado: ${item}, Preço: R$${price.toFixed(2)}`);
    this.orderSubject.notifyObservers(`Seu pedido de ${item} está pronto!`);
  }

  addObserver(observer: any) {
    this.orderSubject.addObserver(observer);
  }
}