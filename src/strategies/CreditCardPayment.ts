import { PaymentStrategy } from './PaymentStrategy';

export class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Pagamento de R$${amount.toFixed(2)} realizado com cartão de crédito.`);
  }
}