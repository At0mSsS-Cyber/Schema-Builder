import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SchemaBuilder from './components/SchemaBuilder';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <SchemaBuilder />
      </div>
    </DndProvider>
  );
};

export default App;
