import { Item } from "./Item";

export class Combo implements Item {
  public readonly type = "Combo";
  private items: Item[] = [];
  private discountPercentage: number = 0;

  constructor(public name: string, public price: number = 0) {}

  addItem(item: Item): void {
    this.items.push(item);
    this.recalculatePrice();
  }

  setDiscount(percentage: number): void {
    this.discountPercentage = percentage;
    this.recalculatePrice();
  }

  getItems(): Item[] {
    return [...this.items];
  }

  getDiscount(): number {
    return this.discountPercentage;
  }

  getOriginalPrice(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  private recalculatePrice(): void {
    const originalPrice = this.getOriginalPrice();
    this.price = originalPrice * (1 - this.discountPercentage / 100);
  }

  getDetails(): string {
    const itemsList = this.items.map((item) => item.name).join(", ");
    const originalPrice = this.getOriginalPrice().toFixed(2);
    return `Combo: ${
      this.name
    }, Itens: [${itemsList}], Preço Original: R$${originalPrice}, Desconto: ${
      this.discountPercentage
    }%, Preço Final: R$${this.price.toFixed(2)}`;
  }
}
