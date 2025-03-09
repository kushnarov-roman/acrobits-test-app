import React, { useState } from "react";
import { BaseItem } from "../../models/BaseItem";
import { ElectronicItem, ElectronicType } from "../../models/ElectronicItem";
import { ClothingItem, ClothingSize } from "../../models/ClothingItem";
import { GroceryItem } from "../../models/GroceryItem";

interface EditItemModalProps {
  item: BaseItem;
  onSave: (updatedItem: BaseItem) => void;
  onCancel: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  item,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [price, setPrice] = useState<number>(item.price);

  const isElectronics = item.type === "Electronics";
  const isClothing = item.type === "Clothing";
  const isGroceries = item.type === "Groceries";

  const [electronicBrand, setElectronicBrand] = useState(
    isElectronics ? (item as ElectronicItem).brand : ""
  );
  const [electronicType, setElectronicType] = useState<ElectronicType>(
    isElectronics ? (item as ElectronicItem).electronicType : "phone"
  );

  const [clothingBrand, setClothingBrand] = useState(
    isClothing ? (item as ClothingItem).brand : ""
  );
  const [clothingSize, setClothingSize] = useState<ClothingSize>(
    isClothing ? (item as ClothingItem).size : "m"
  );

  const [groceryKind, setGroceryKind] = useState(
    isGroceries ? (item as GroceryItem).kind : ""
  );
  const [expirationDate, setExpirationDate] = useState(
    isGroceries ? (item as GroceryItem).expirationDate : ""
  );

  const handleSave = (e: React.FormEvent) => {
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

    let updatedItem: BaseItem;

    switch (item.type) {
      case "Electronics":
        updatedItem = new ElectronicItem(
          item.id,
          name,
          quantity,
          price,
          electronicBrand,
          electronicType
        );
        break;
      case "Clothing":
        updatedItem = new ClothingItem(
          item.id,
          name,
          quantity,
          price,
          clothingBrand,
          clothingSize
        );
        break;
      case "Groceries":
        updatedItem = new GroceryItem(
          item.id,
          name,
          quantity,
          price,
          groceryKind,
          expirationDate
        );
        break;
      default:
        updatedItem = { ...item, name, quantity, price };
        break;
    }

    onSave(updatedItem);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white p-3">
        <h4>Edit {item.name}</h4>
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label>Item Type (read-only)</label>
            <input
              className="form-control"
              type="text"
              value={item.type}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          {isElectronics && (
            <>
              <div className="mb-3">
                <label>Brand</label>
                <input
                  className="form-control"
                  type="text"
                  value={electronicBrand}
                  onChange={(e) => setElectronicBrand(e.target.value)}
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
                  <option value="tv">TV</option>
                  <option value="headphones">Headphones</option>
                </select>
              </div>
            </>
          )}

          {isClothing && (
            <>
              <div className="mb-3">
                <label>Brand</label>
                <input
                  className="form-control"
                  type="text"
                  value={clothingBrand}
                  onChange={(e) => setClothingBrand(e.target.value)}
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

          {isGroceries && (
            <>
              <div className="mb-3">
                <label>Kind</label>
                <input
                  className="form-control"
                  type="text"
                  value={groceryKind}
                  onChange={(e) => setGroceryKind(e.target.value)}
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

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
