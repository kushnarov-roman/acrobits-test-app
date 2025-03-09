import { BaseItem } from "./BaseItem";

export type ClothingSize = "s" | "m" | "l" | "xl";

export class ClothingItem extends BaseItem {
  brand: string;
  size: ClothingSize;

  constructor(
    id: string,
    name: string,
    quantity: number,
    price: number,
    brand: string,
    size: ClothingSize
  ) {
    super(id, name, "Clothing", quantity, price);
    this.brand = brand;
    this.size = size;
  }
}
