import { ItemFactory } from "../factories/ItemFactory";
import { Item } from "../models/Item";

export class MenuService {
  private menu: Item[] = [];

  addItem(type: string, name: string, price: number) {
    const item = ItemFactory.criarItem(type, name, price);
    this.menu.push(item);
    console.log(`Item adicionado ao cardápio: ${item.getDetails()}`);
  }

  getItemByName(name: string): Item | undefined {
    return this.menu.find((item) => this.isSameItemName(item.name, name));
  }

  removeItem(name: string) {
    const itemIndex = this.menu.findIndex((item) =>
      this.isSameItemName(item.name, name)
    );
    if (itemIndex !== -1) {
      const removedItem = this.menu.splice(itemIndex, 1);
      console.log(`Item removido do cardápio: ${removedItem[0].getDetails()}`);
    } else {
      console.log(`Item '${name}' não encontrado no cardápio.`);
    }
  }

  displayMenu() {
    return this.menu.map((item) => ({
      type: item.type,
      name: item.name,
      price: item.price,
    }));
  }

  private isSameItemName(a: string, b: string): boolean {
    return a.toLowerCase() === b.toLowerCase();
  }
}
