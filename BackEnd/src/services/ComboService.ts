import { Combo } from "../models/Combo";
import { MenuService } from "./MenuService";
import { ComboBuilder } from "../builders/ComboBuilder";

/**
 * Serviço para gerenciamento de combos usando interface fluente
 */
export class ComboService {
  private combos: Combo[] = [];
  private menuService: MenuService;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  /**
   * Inicia a criação de um novo combo com interface fluente
   */
  createCombo(name: string): ComboBuilder {
    return new ComboBuilder(this.menuService, name);
  }

  /**
   * Registra um combo no sistema
   */
  registerCombo(combo: Combo): void {
    this.combos.push(combo);
    console.log(`Combo registrado: ${combo.getDetails()}`);
  }

  /**
   * Cria e registra um combo promocional predefinido
   */
  createPromotionalCombo(name: string, itemNames: string[], discountPercentage: number): Combo {
    const combo = this.createCombo(name)
      .withItems(itemNames)
      .withDiscount(discountPercentage)
      .build();
    
    this.registerCombo(combo);
    return combo;
  }

  /**
   * Retorna todos os combos disponíveis
   */
  getAllCombos(): Combo[] {
    return [...this.combos];
  }

  /**
   * Encontra um combo pelo nome
   */
  getComboByName(name: string): Combo | undefined {
    return this.combos.find(combo => 
      combo.name.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * Exibe todos os combos de forma formatada
   */
  displayCombos(): Array<{name: string, price: number, originalPrice: number, discount: number}> {
    return this.combos.map(combo => ({
      name: combo.name,
      price: combo.price,
      originalPrice: combo.getOriginalPrice(),
      discount: combo.getDiscount()
    }));
  }
}