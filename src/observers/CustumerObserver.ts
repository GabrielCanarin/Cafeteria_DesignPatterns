import { OrderObserver } from "./OrderObserver";

export class CustomerObserver implements OrderObserver {
  update(orderStatus: string): void {
    console.log(`Notificação ao cliente: ${orderStatus}`);
  }
}
