import React from 'react';
import { useDrag } from 'react-dnd';

interface ColumnProps {
  columnName: string;
}

const Column: React.FC<ColumnProps> = ({ columnName }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COLUMN',
    item: { columnName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 bg-green-100 cursor-pointer ${isDragging ? 'opacity-50' : ''}`}
    >
      {columnName}
    </div>
  );
};

export default Column;
