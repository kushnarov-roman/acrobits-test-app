export type ItemType = "Electronics" | "Clothing" | "Groceries";

export abstract class BaseItem {
  id: string;
  name: string;
  type: ItemType;
  quantity: number;
  price: number;

  constructor(
    id: string,
    name: string,
    type: ItemType,
    quantity: number,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.quantity = quantity;
    this.price = price;
  }
}
