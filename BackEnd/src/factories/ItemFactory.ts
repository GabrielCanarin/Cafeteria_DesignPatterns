import { Bebida } from "../models/Bebida";
import { Doce } from "../models/Doce";
import { Salgado } from "../models/Salgado";
import { Item } from "../models/Item";

type ItemConstructor = new (name: string, price: number) => Item;

export class ItemFactory {
  private static registry: Record<string, ItemConstructor> = {
    bebida: Bebida,
    doce: Doce,
    salgado: Salgado,
  };

  static createItem(type: string, name: string, price: number): Item {
    const ItemClass = this.registry[type.toLowerCase()];
    if (!ItemClass) throw new Error(`Tipo de item inválido: ${type}`);
    return new ItemClass(name, price);
  }
}
