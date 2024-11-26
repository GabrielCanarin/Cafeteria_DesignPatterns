import { PaymentStrategy } from "./PaymentStrategy";

export class CashPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Pagamento de R$${amount.toFixed(2)} realizado via Pix.`);
  }
}
