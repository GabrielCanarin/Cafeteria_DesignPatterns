import { MenuService } from "./MenuService";
import { OrderService } from "./OrderService";
import { CustomerObserver } from "../observers/CustumerObserver";
export class OrderHandler {
  private menuService: MenuService;
  private orderService: OrderService;

  constructor(menuService: MenuService, orderService: OrderService) {
    this.menuService = menuService;
    this.orderService = orderService;

    // Adiciona o observador
    const customerObserver = new CustomerObserver();
    this.orderService.addObserver(customerObserver);
  }

  startOrder(): void {
    this.orderService.createOrder();
  }

  addItemToOrder(itemName: string): void {
    const item = this.menuService.getItemByName(itemName);
    if (item) {
      this.orderService.addItemToOrder(item);
    } else {
      console.log(`Erro: Item "${itemName}" não encontrado.`);
    }
  }

  finalizeOrder(paymentType: string): void {
    this.orderService.processOrder(paymentType);
  }
}
