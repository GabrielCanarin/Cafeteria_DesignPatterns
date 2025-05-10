import { Item } from "./Item";

export class Salgado implements Item {
  constructor(public name: string, public price: number) { }
  getDetails(): string {
    return `Salgado: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}
