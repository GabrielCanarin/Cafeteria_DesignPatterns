export class Item {
  constructor(public type: string, public name: string, public price: number) {}

  getDetails() {
    return `${this.type}: ${this.name} - R$${this.price.toFixed(2)}`;
  }
}
