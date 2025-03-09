import React, { useState } from "react";
import InventoryService from "./services/InventoryService";
import MemoryAdapter from "./adapters/MemoryAdapter";
import LocalStorageAdapter from "./adapters/LocalStorageAdapter";
import InventoryList from "./components/InventoryList";
import InventoryForm from "./components/InventoryForm";
import InventoryFilter from "./components/InventoryFilter";
import { BaseItem } from "./models/BaseItem";
import EditItemModal from "./components/modals/EditItemModal";

const App: React.FC = () => {
  const [adapterType, setAdapterType] = useState<"memory" | "local">("memory");
  const [inventoryService, setInventoryService] = useState<InventoryService>(
    new InventoryService(new MemoryAdapter())
  );

  const [items, setItems] = useState<BaseItem[]>(
    inventoryService.getAllItems()
  );
  const [filterType, setFilterType] = useState<string>("all");

  const [editingItem, setEditingItem] = useState<BaseItem | null>(null);

  const handleChangeAdapter = (type: "memory" | "local") => {
    setAdapterType(type);
    const newService =
      type === "memory"
        ? new InventoryService(new MemoryAdapter())
        : new InventoryService(new LocalStorageAdapter());
    setInventoryService(newService);
    setItems(newService.getAllItems());
  };

  const refreshItems = () => {
    setItems([...inventoryService.getAllItems()]);
  };

  const handleStartEdit = (item: BaseItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (updatedItem: BaseItem) => {
    inventoryService.updateItem(updatedItem);
    refreshItems();
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Inventory Management</h1>

      <div className="mb-3">
        <label className="form-label">Persistence Type:</label>
        <select
          className="form-select"
          value={adapterType}
          onChange={(e) =>
            handleChangeAdapter(e.target.value as "memory" | "local")
          }
        >
          <option value="memory">In-Memory</option>
          <option value="local">Local Storage</option>
        </select>
      </div>

      <InventoryFilter filterType={filterType} setFilterType={setFilterType} />

      <InventoryList
        items={items}
        filterType={filterType}
        onDelete={(id) => {
          inventoryService.deleteItem(id);
          refreshItems();
        }}
        onStartEdit={handleStartEdit}
      />

      <hr />

      <InventoryForm
        onAdd={(newItem) => {
          inventoryService.addItem(newItem);
          refreshItems();
        }}
      />

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default App;
