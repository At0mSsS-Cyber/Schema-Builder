import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

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
  onColumnDrop: (
    sourceTableId: string,
    sourceColumn: string,
    targetTableId: string,
    targetColumn: string
  ) => void;
}

const TableBlock = ({
  table,
  onRemove,
  position,
  updatePosition,
  onColumnDrop,
}: TableBlockProps) => {
  const [{ isDraggingTable }, drag, preview] = useDrag(() => ({
    type: "TABLE",
    item: { id: table.id },
    collect: (monitor) => ({
      isDraggingTable: monitor.isDragging(),
    }),
  }));

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
      ref={preview}
      className="border p-2 m-2 w-48 h-40 bg-white shadow-md absolute"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDraggingTable ? 0.5 : 1,
      }}
    >
      <div
        ref={drag}
        className="flex justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="font-bold text-lg">{table.name}</span>
        <button onClick={() => onRemove(table.id)} className="text-red-500">
          X
        </button>
      </div>
      <ul>
        {table.columns.map((column) => (
          <Column
            key={column}
            tableId={table.id}
            column={column}
            onColumnDrop={onColumnDrop}
          />
        ))}
      </ul>
    </div>
  );
};

interface ColumnProps {
  tableId: string;
  column: string;
  onColumnDrop: (
    sourceTableId: string,
    sourceColumn: string,
    targetTableId: string,
    targetColumn: string
  ) => void;
}

const Column = ({ tableId, column, onColumnDrop }: ColumnProps) => {
  const [, ref] = useDrag({
    type: "COLUMN",
    item: { tableId, column },
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    drop: (item: { tableId: string; column: string }) => {
      if (item.tableId !== tableId || item.column !== column) {
        onColumnDrop(item.tableId, item.column, tableId, column);
      }
    },
  });

  return (
    <li ref={(node) => ref(drop(node))} className="p-1 border cursor-pointer">
      {column}
    </li>
  );
};

export default TableBlock;
