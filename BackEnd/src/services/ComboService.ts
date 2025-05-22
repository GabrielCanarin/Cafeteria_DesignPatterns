import { Combo } from "../models/Combo";
import { MenuService } from "./MenuService";
import { ComboBuilder } from "../builders/ComboBuilder";

export class ComboService {
  private combos: Combo[] = [];
  private menuService: MenuService;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  createCombo(name: string): ComboBuilder {
    return new ComboBuilder(this.menuService, name);
  }

  registerCombo(combo: Combo): void {
    this.combos.push(combo);
    console.log(`Combo registrado: ${combo.getDetails()}`);
  }

  createPromotionalCombo(name: string, itemNames: string[], discountPercentage: number): Combo {
    const combo = this.createCombo(name)
      .withItems(itemNames)
      .withDiscount(discountPercentage)
      .build();
    
    this.registerCombo(combo);
    return combo;
  }

  getAllCombos(): Combo[] {
    return [...this.combos];
  }

  getComboByName(name: string): Combo | undefined {
    return this.combos.find(combo => 
      combo.name.toLowerCase() === name.toLowerCase()
    );
  }

  displayCombos(): Array<{name: string, price: number, originalPrice: number, discount: number}> {
    return this.combos.map(combo => ({
      name: combo.name,
      price: combo.price,
      originalPrice: combo.getOriginalPrice(),
      discount: combo.getDiscount()
    }));
  }
}
