import { BaseItem } from "../models/BaseItem";
import StorageAdapter from "./types";

export default class MemoryAdapter implements StorageAdapter {
  private items: BaseItem[] = [];

  getAllItems(): BaseItem[] {
    return this.items;
  }

  addItem(item: BaseItem): void {
    this.items.push(item);
  }

  updateItem(updatedItem: BaseItem): void {
    this.items = this.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }

  deleteItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
