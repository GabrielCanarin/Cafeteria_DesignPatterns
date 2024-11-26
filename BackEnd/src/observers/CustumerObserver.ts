import { OrderObserver } from "./OrderObserver";

export class CustomerObserver implements OrderObserver {
  update(message: string): void {
    console.log(`🔔 [Notificação para o cliente]: ${message}`);
  }
}
