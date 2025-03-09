import StorageAdapter from "../adapters/types";
import { BaseItem } from "../models/BaseItem";

export default class InventoryService {
  private adapter: StorageAdapter;

  constructor(adapter: StorageAdapter) {
    this.adapter = adapter;
  }

  getAllItems(): BaseItem[] {
    return this.adapter.getAllItems();
  }

  addItem(item: BaseItem): void {
    this.adapter.addItem(item);
  }

  updateItem(item: BaseItem): void {
    this.adapter.updateItem(item);
  }

  deleteItem(id: string): void {
    this.adapter.deleteItem(id);
  }
}
