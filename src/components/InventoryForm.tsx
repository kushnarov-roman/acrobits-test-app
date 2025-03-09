import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BaseItem, ItemType } from "../models/BaseItem";
import { ElectronicItem, ElectronicType } from "../models/ElectronicItem";
import { ClothingItem, ClothingSize } from "../models/ClothingItem";
import { GroceryItem } from "../models/GroceryItem";

interface InventoryFormProps {
  onAdd: (item: BaseItem) => void;
}

const itemTypes: ItemType[] = ["Electronics", "Clothing", "Groceries"];

const InventoryForm: React.FC<InventoryFormProps> = ({ onAdd }) => {
  const [type, setType] = useState<ItemType>("Electronics");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const [electronicBrand, setElectronicBrand] = useState("");
  const [electronicType, setElectronicType] = useState<ElectronicType>("phone");

  const [clothingBrand, setClothingBrand] = useState("");
  const [clothingSize, setClothingSize] = useState<ClothingSize>("m");

  const [groceryKind, setGroceryKind] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const resetForm = () => {
    setName("");
    setQuantity(0);
    setPrice(0);
    setElectronicBrand("");
    setElectronicType("phone");
    setClothingBrand("");
    setClothingSize("m");
    setGroceryKind("");
    setExpirationDate("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (quantity < 0) {
      alert("Quantity cannot be negative");
      return;
    }
    if (price < 0) {
      alert("Price cannot be negative");
      return;
    }

    let newItem: BaseItem;
    const id = uuidv4();

    switch (type) {
      case "Electronics":
        newItem = new ElectronicItem(
          id,
          name,
          quantity,
          price,
          electronicBrand,
          electronicType
        );
        break;
      case "Clothing":
        newItem = new ClothingItem(
          id,
          name,
          quantity,
          price,
          clothingBrand,
          clothingSize
        );
        break;
      case "Groceries":
        newItem = new GroceryItem(
          id,
          name,
          quantity,
          price,
          groceryKind,
          expirationDate
        );
        break;
      default:
        return;
    }

    onAdd(newItem);
    resetForm();
  };

  return (
    <div>
      <h4>Add New Item</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Type</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value as ItemType)}
          >
            {itemTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
          />
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            className="form-control"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {type === "Electronics" && (
          <>
            <div className="mb-3">
              <label>Brand</label>
              <input
                className="form-control"
                type="text"
                value={electronicBrand}
                onChange={(e) => setElectronicBrand(e.target.value)}
                placeholder="Electronics Brand"
              />
            </div>
            <div className="mb-3">
              <label>Electronic Type</label>
              <select
                className="form-select"
                value={electronicType}
                onChange={(e) =>
                  setElectronicType(e.target.value as ElectronicType)
                }
              >
                <option value="phone">Phone</option>
                <option value="tV">TV</option>
                <option value="headphones">Headphones</option>
              </select>
            </div>
          </>
        )}

        {type === "Clothing" && (
          <>
            <div className="mb-3">
              <label>Brand</label>
              <input
                className="form-control"
                type="text"
                value={clothingBrand}
                onChange={(e) => setClothingBrand(e.target.value)}
                placeholder="Clothing Brand"
              />
            </div>
            <div className="mb-3">
              <label>Size</label>
              <select
                className="form-select"
                value={clothingSize}
                onChange={(e) =>
                  setClothingSize(e.target.value as ClothingSize)
                }
              >
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>
            </div>
          </>
        )}

        {type === "Groceries" && (
          <>
            <div className="mb-3">
              <label>Kind</label>
              <input
                className="form-control"
                type="text"
                value={groceryKind}
                onChange={(e) => setGroceryKind(e.target.value)}
                placeholder="Groceries Kind"
              />
            </div>
            <div className="mb-3">
              <label>Expiration Date</label>
              <input
                className="form-control"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
