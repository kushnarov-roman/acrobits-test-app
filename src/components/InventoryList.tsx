import React from "react";
import { BaseItem } from "../models/BaseItem";

interface InventoryListProps {
  items: BaseItem[];
  filterType: string;
  onDelete: (id: string) => void;
  onStartEdit: (item: BaseItem) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({
  items,
  filterType,
  onDelete,
  onStartEdit,
}) => {
  const filteredItems =
    filterType === "all"
      ? items
      : items.filter((item) => item.type === filterType);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col" style={{ width: "10%" }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onStartEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {filteredItems.length === 0 && (
          <tr>
            <td colSpan={5}>No items found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InventoryList;
