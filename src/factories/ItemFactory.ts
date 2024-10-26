import { Bebida } from '../models/Bebida';
import { Lanche } from '../models/Lanche';

export class ItemFactory {
  static createItem(type: string, name: string, price: number) {
    switch (type.toLowerCase()) {
      case 'bebida':
        return new Bebida(name, price);
      case 'lanche':
        return new Lanche(name, price);
      default:
        throw new Error('Tipo de item desconhecido');
    }
  }
}