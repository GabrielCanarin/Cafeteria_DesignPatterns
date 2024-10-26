import { Item } from './Item';

export class Bebida extends Item {
  constructor(name: string, price: number) {
    super(name, price);
  }

  getDetails(): string {
    return `Bebida: ${this.name}, Preço: R$${this.price.toFixed(2)}`;
  }
}