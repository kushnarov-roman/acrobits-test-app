import { BaseItem } from "../models/BaseItem";

export default interface StorageAdapter {
  getAllItems(): BaseItem[];
  addItem(item: BaseItem): void;
  updateItem(item: BaseItem): void;
  deleteItem(id: string): void;
}
