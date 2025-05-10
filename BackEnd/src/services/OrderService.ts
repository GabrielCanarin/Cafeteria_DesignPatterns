import { OrderSubject } from "../observers/OrderSubject";
import { Item } from "../models/Item";
import { PaymentStrategy } from "../strategies/PaymentStrategy";
import { CreditCardPayment } from "../strategies/CreditCardPayment";
import { PixPayment } from "../strategies/CashPayment";

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

    const paymentStrategies: Record<string, PaymentStrategy> = {
      pix: new PixPayment(),
      creditcard: new CreditCardPayment(),
    };

    const strategy = paymentStrategies[paymentType.toLowerCase()];
    if (!strategy) {
      console.log("Método de pagamento inválido. Tente novamente.");
      return;
    }

    strategy.pay(total);

    this.notifyObservers(
      `Pedido finalizado. Total: R$ ${total.toFixed(2)}. Pagamento processado com ${paymentType === "pix" ? "Pix" : "Cartão de Crédito"}.`
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
