import { ItemFactory } from "../factories/ItemFactory";
import { Item } from "../models/Item";

export class MenuService {
  private menu: Item[] = [];

  addItem(category: string, name: string, price: number) {
    const item = ItemFactory.createItem(category, name, price);
    this.menu.push(item);
    console.log(`Item adicionado ao cardápio: ${item.getDetails()}`);
  }

  getItemByName(name: string): Item | undefined {
    return this.menu.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  }

  removeItem(name: string) {
    const itemIndex = this.menu.findIndex(
      (item) => item.name.toLowerCase() === name.toLowerCase()
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
      category: item.type,
      name: item.name,
      price: item.price,
    }));
  }
}
