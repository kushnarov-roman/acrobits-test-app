import { BaseItem } from "./BaseItem";

export class GroceryItem extends BaseItem {
  kind: string;
  expirationDate: string;

  constructor(
    id: string,
    name: string,
    quantity: number,
    price: number,
    kind: string,
    expirationDate: string
  ) {
    super(id, name, "Groceries", quantity, price);
    this.kind = kind;
    this.expirationDate = expirationDate;
  }
}
