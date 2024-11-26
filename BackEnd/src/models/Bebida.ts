import { Item } from "./Item";

export class Bebida extends Item {
  constructor(type: string, name: string, price: number) {
    super(type, name, price);
  }

  getDetails(): string {
    return `Bebida: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}
