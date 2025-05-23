import { Item } from "./Item";

export class Salgado implements Item {
  public readonly type = "Salgado";
  constructor(public name: string, public price: number) {}
  getDetails(): string {
    return `Salgado: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}
