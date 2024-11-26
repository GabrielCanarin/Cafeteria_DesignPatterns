import { OrderSubject } from "../observers/OrderSubject";
import { Item } from "../models/Item";

export class OrderService extends OrderSubject {
  private currentOrder: Item[] = [];

  createOrder(): void {
    this.currentOrder = [];
    this.notifyObservers("Pedido iniciado.");
  }

  addItemToOrder(item: Item): void {
    this.currentOrder.push(item);
    this.notifyObservers(`Item adicionado: ${item.name}`);
  }

  processOrder(paymentType: string): void {
    const total = this.getCurrentTotal();
    this.notifyObservers(
      `Pedido finalizado. Total: R$ ${total.toFixed(
        2
      )}. Pagamento processado com ${paymentType}.`
    );
    this.currentOrder = [];
  }

  getOrderItems(): Item[] {
    return this.currentOrder;
  }

  getCurrentTotal(): number {
    return this.currentOrder.reduce((acc, item) => acc + item.price, 0);
  }
}
