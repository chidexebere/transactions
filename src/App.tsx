import React from 'react';
import { useJsonData } from './hooks';
import SortableTable from './components/SortableTable';

function App() {
  const { isLoading, isError, data } = useJsonData();

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <h2>Something went wrong, can not load JSON data</h2>;
  }

  return (
    <div className="App">
      <header className="App-header">Transactions</header>
      {data && <SortableTable tableData={data} />}
    </div>
  );
}

export default App;
