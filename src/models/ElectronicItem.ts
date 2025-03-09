import { BaseItem } from "./BaseItem";

export type ElectronicType = "phone" | "tv" | "headphones";

export class ElectronicItem extends BaseItem {
  brand: string;
  electronicType: ElectronicType;

  constructor(
    id: string,
    name: string,
    quantity: number,
    price: number,
    brand: string,
    electronicType: ElectronicType
  ) {
    super(id, name, "Electronics", quantity, price);
    this.brand = brand;
    this.electronicType = electronicType;
  }
}
