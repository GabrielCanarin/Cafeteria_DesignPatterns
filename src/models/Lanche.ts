import { Item } from './Item';

export class Lanche extends Item {
  constructor(name: string, price: number) {
    super(name, price);
  }

  getDetails(): string {
    return `Lanche: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}