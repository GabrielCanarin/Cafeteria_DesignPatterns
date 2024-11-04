import { OrderService } from "./services/OrderService";
import { MenuService } from "./services/MenuService";
import { OrderHandler } from "./services/OrderHandler";

const menuService = new MenuService();
menuService.addItem("Bebida", "Café", 5.0);
menuService.addItem("Bebida", "Guaraná", 5.5);
menuService.addItem("Lanche", "Bolo", 10.0);
menuService.addItem("Lanche", "Hamburguer", 20.5);
menuService.addItem("Lanche", "Assado", 7.0);

menuService.displayMenu();

menuService.removeItem("Bolo");
menuService.displayMenu();

const orderService = new OrderService();
const orderHandler = new OrderHandler(menuService, orderService);

orderHandler.startOrder();
