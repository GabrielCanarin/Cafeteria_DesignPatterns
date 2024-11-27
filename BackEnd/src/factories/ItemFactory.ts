import { Item } from "../models/Item";
import { Bebida } from "../models/Bebida";
import { Doce } from "../models/Doce";
import { Salgado } from "../models/Salgado";

export class ItemFactory {
  static createItem(type: string, name: string, price: number): Item {
    switch (type.toLowerCase()) {
      case "bebidas":
        return new Bebida(type, name, price);
      case "doces":
        return new Doce(type, name, price);
      case "salgados":
        return new Salgado(type, name, price);
      default:
        throw new Error("Tipo de item desconhecido");
    }
  }
}
