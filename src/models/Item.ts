export abstract class Item {
  constructor(public name: string, public price: number) { }
  abstract getDetails(): string;
}