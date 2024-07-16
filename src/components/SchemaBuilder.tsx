import React, { useState } from "react";
import TableBlock from "./TableBlock";

interface Table {
  id: string;
  name: string;
  columns: string[];
}

const tablesData: Table[] = [
  { id: "1", name: "Users", columns: ["id", "name", "email"] },
  { id: "2", name: "Products", columns: ["id", "title", "price"] },
];

const SchemaBuilder = () => {
  const [addedTables, setAddedTables] = useState<Table[]>([]);
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  const handleDrop = (table: Table) => {
    if (!addedTables.some((t) => t.id === table.id)) {
      const newPosition = findNonOverlappingPosition();
      setAddedTables((prev) => [...prev, table]);
      setPositions((prev) => ({
        ...prev,
        [table.id]: newPosition,
      }));
    } else {
      alert("Table already added!");
    }
  };

  const handleRemove = (id: string) => {
    setAddedTables(addedTables.filter((table) => table.id !== id));
    setPositions((prev) => {
      const newPositions = { ...prev };
      delete newPositions[id];
      return newPositions;
    });
  };

  const updatePosition = (id: string, x: number, y: number) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  };

  const findNonOverlappingPosition = () => {
    const gap = 20;
    const width = 200;
    const height = 160;
    const padding = 10;

    for (let y = padding; y < window.innerHeight - height; y += height + gap) {
      for (let x = padding; x < window.innerWidth - width; x += width + gap) {
        const overlap = addedTables.some((table) => {
          const pos = positions[table.id];
          return (
            pos &&
            x < pos.x + width &&
            x + width > pos.x &&
            y < pos.y + height &&
            y + height > pos.y
          );
        });

        if (!overlap) {
          return { x, y };
        }
      }
    }

    // Default position if all spaces are occupied (unlikely)
    return { x: padding, y: padding };
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border p-2 bg-gray-100">
        <h2 className="font-bold">Available Tables</h2>
        {tablesData.map((table) => (
          <div
            key={table.id}
            className="border p-2 m-2 w-48 h-40 bg-white shadow-md cursor-pointer"
            onClick={() => handleDrop(table)}
          >
            <div className="flex justify-between">
              <span className="font-bold text-lg">{table.name}</span>
            </div>
            <ul>
              {table.columns.map((column) => (
                <li key={column}>{column}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex-1 border p-2 bg-grid relative">
        <h2 className="font-bold">Schema Area</h2>
        {addedTables.map((table) => (
          <TableBlock
            key={table.id}
            table={table}
            onRemove={handleRemove}
            position={positions[table.id]}
            updatePosition={updatePosition}
          />
        ))}
      </div>
    </div>
  );
};

export default SchemaBuilder;
