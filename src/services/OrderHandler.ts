import { OrderService } from "./OrderService";
import { MenuService } from "./MenuService";
import { CashPayment } from "../strategies/CashPayment";
import { CreditCardPayment } from "../strategies/CreditCardPayment";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class OrderHandler {
  private menuService: MenuService;
  private orderService: OrderService;
  private totalAmount: number = 0;

  constructor(menuService: MenuService, orderService: OrderService) {
    this.menuService = menuService;
    this.orderService = orderService;
  }

  takeOrder() {
    rl.question("Qual item você gostaria de pedir? ", (itemName) => {
      const item = this.menuService["menu"].find(
        (i) => i.name.toLowerCase() === itemName.toLowerCase()
      );
      if (item) {
        this.orderService.placeOrder(itemName, item.price);
        this.totalAmount += item.price;
        this.askForMore();
      } else {
        console.log(`Item '${itemName}' não encontrado no cardápio.`);
        this.takeOrder();
      }
    });
  }

  private askForMore() {
    rl.question(
      "Você gostaria de pedir mais alguma coisa? (s/n) ",
      (answer) => {
        if (answer.toLowerCase() === "s") {
          this.takeOrder();
        } else {
          this.handlePayment();
        }
      }
    );
  }

  private handlePayment() {
    console.log(`Total a pagar: R$${this.totalAmount.toFixed(2)}`);
    rl.question(
      "Você gostaria de pagar em dinheiro ou cartão? (d/c) ",
      (paymentMethod) => {
        let paymentStrategy;
        if (paymentMethod.toLowerCase() === "d") {
          paymentStrategy = new CashPayment();
        } else if (paymentMethod.toLowerCase() === "c") {
          paymentStrategy = new CreditCardPayment();
        } else {
          console.log("Método de pagamento inválido. Tente novamente.");
          this.handlePayment();
          return;
        }
        paymentStrategy.pay(this.totalAmount);
        rl.close();
      }
    );
  }
}
