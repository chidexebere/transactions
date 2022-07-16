import React from 'react';
import { generateJSON } from './api/generateJSON';

function App() {
  generateJSON();
  return (
    <div className="App">
      <header className="App-header">Transactions</header>
    </div>
  );
}

export default App;
