import { Combo } from "../models/Combo";
import { Item } from "../models/Item";
import { MenuService } from "../services/MenuService";

/**
 * Builder fluente para criação de combos
 */
export class ComboBuilder {
  private combo: Combo;
  private menuService: MenuService;

  constructor(menuService: MenuService, name: string) {
    this.menuService = menuService;
    this.combo = new Combo(name);
  }

  /**
   * Adiciona um item ao combo pelo nome
   */
  withItem(itemName: string): ComboBuilder {
    const item = this.menuService.getItemByName(itemName);
    if (item) {
      this.combo.addItem(item);
    } else {
      console.log(`Erro: Item "${itemName}" não encontrado.`);
    }
    return this;
  }

  /**
   * Adiciona vários itens ao combo pelos nomes
   */
  withItems(itemNames: string[]): ComboBuilder {
    itemNames.forEach(name => {
      this.withItem(name);
    });
    return this;
  }

  /**
   * Adiciona um item diretamente ao combo
   */
  withDirectItem(item: Item): ComboBuilder {
    this.combo.addItem(item);
    return this;
  }

  /**
   * Define o desconto percentual para o combo
   */
  withDiscount(percentage: number): ComboBuilder {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Desconto deve estar entre 0 e 100%");
    }
    this.combo.setDiscount(percentage);
    return this;
  }

  /**
   * Finaliza a construção e retorna o combo
   */
  build(): Combo {
    if (this.combo.getItems().length === 0) {
      throw new Error("Um combo deve conter pelo menos um item");
    }
    return this.combo;
  }
}