import { BaseItem } from "../models/BaseItem";
import StorageAdapter from "./types";

const STORAGE_KEY = "inventory_items";

export default class LocalStorageAdapter implements StorageAdapter {
  getAllItems(): BaseItem[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  }

  addItem(item: BaseItem): void {
    const items = this.getAllItems();
    items.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  updateItem(updatedItem: BaseItem): void {
    let items = this.getAllItems();
    items = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  deleteItem(id: string): void {
    let items = this.getAllItems();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
