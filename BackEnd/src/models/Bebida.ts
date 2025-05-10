import { Item } from "./Item";

export class Bebida implements Item {
  constructor(public name: string, public price: number) { }
  getDetails(): string {
    return `Bebida: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}
