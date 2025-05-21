import { Item } from "./Item";

export class Doce implements Item {
  public readonly type = "Doce";
  constructor(public name: string, public price: number) { }
  getDetails(): string {
    return `Doce: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}
