# Acrobits Inventory Management Application

A minimal React + TypeScript application for managing items of three types (Electronics, Clothing, Groceries), supporting CRUD operations, filtering, and adapter-based data persistence (in-memory or local storage).

## How to Install Locally

1. **Clone the repo**:
   ```bash
   git clone https://github.com/kushnarov-roman/acrobits-test-app.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

## How to Run Locally

1. **Development Mode**:
   ```bash
   npm start
   *Access at http://localhost:3000.*
   ```

## Trade-Offs / Assumptions

In-Memory vs Local Storage: Data in memory resets on page refresh, while local storage persists. Switching adapters uses separate data sets.
P.S: Data in memory also resets on change of "Persistence Type". It could be fixed if we use useRef instead of just useState.

Validation: Basic checks (e.g., no negative values). You can extend validation with form libraries if needed.
