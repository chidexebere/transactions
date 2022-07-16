import React from 'react';
import { useQuery } from 'react-query';
import { generateJSON } from './api/generateJSON';

function App() {
  const { isLoading, isError, data } = useQuery('expenses', generateJSON);

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <h2>Something went wrong, can not load JSON data</h2>;
  }

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">Transactions</header>
    </div>
  );
}

export default App;
