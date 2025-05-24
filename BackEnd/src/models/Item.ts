export interface Item {
  type: string;
  name: string;
  price: number;
  getDetails(): string;
}
