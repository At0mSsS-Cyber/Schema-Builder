import React from 'react';

interface TableListProps {
  tables: string[];
  onTableSelect: (tableName: string) => void;
}

const TableList: React.FC<TableListProps> = ({ tables, onTableSelect }) => {
  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Tables</h2>
      <ul>
        {tables.map((table) => (
          <li
            key={table}
            className="p-2 mb-2 bg-gray-100 cursor-pointer"
            onClick={() => onTableSelect(table)}
          >
            {table}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
