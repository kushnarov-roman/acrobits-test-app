import React from "react";

interface InventoryFilterProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

const InventoryFilter: React.FC<InventoryFilterProps> = ({
  filterType,
  setFilterType,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">Filter by Type:</label>
      <select
        className="form-select"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Groceries">Groceries</option>
      </select>
    </div>
  );
};

export default InventoryFilter;
