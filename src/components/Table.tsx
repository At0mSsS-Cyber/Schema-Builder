import React from 'react';
import { useDrag } from 'react-dnd';

interface TableProps {
  tableName: string;
  columns: string[];
  moveTable: (id: string, left: number, top: number) => void;
}

const Table: React.FC<TableProps> = ({ tableName, columns, moveTable }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TABLE',
    item: { tableName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 bg-blue-100 cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h3 className="text-lg font-bold mb-2">{tableName}</h3>
      <ul>
        {columns.map((column) => (
          <li key={column} className="p-1 bg-gray-200 mb-1">{column}</li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
