import { Item } from "./Item";

export class Salgado extends Item {
  constructor(type: string, name: string, price: number) {
    super(type, name, price);
  }

  getDetails(): string {
    return `Lanche: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}
