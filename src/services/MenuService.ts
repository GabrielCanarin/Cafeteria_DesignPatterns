import { ItemFactory } from '../factories/ItemFactory';
import { Item } from '../models/Item';

export class MenuService {
  private menu: Item[] = [];

  addItem(type: string, name: string, price: number) {
    const item = ItemFactory.createItem(type, name, price);
    this.menu.push(item);
    console.log(`Item adicionado ao cardápio: ${item.getDetails()}`);
  }

  removeItem(name: string) {
    const itemIndex = this.menu.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
    if (itemIndex !== -1) {
      const removedItem = this.menu.splice(itemIndex, 1);
      console.log(`Item removido do cardápio: ${removedItem[0].getDetails()}`);
    } else {
      console.log(`Item '${name}' não encontrado no cardápio.`);
    }
  }

  displayMenu() {
    console.log("Cardápio:");
    this.menu.forEach(item => {
      console.log(item.getDetails());
    });
    console.log("--------------------------------------------------------");
  }
}