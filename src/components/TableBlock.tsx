import React, { useState } from "react";

interface Table {
  id: string;
  name: string;
  columns: string[];
}

interface TableBlockProps {
  table: Table;
  onRemove: (id: string) => void;
  position: { x: number; y: number };
  updatePosition: (id: string, x: number, y: number) => void;
}

const TableBlock = ({
  table,
  onRemove,
  position,
  updatePosition,
}: TableBlockProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updatePosition(table.id, e.clientX - offset.x, e.clientY - offset.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="border p-2 m-2 w-48 h-40 bg-white shadow-md absolute"
      style={{ left: position.x, top: position.y, cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex justify-between">
        <span className="font-bold text-lg">{table.name}</span>
        <button onClick={() => onRemove(table.id)} className="text-red-500">
          X
        </button>
      </div>
      <ul>
        {table.columns.map((column) => (
          <li key={column}>{column}</li>
        ))}
      </ul>
    </div>
  );
};

export default TableBlock;
