import { useJsonData } from './hooks';
import { StyledLayout } from './styles/Layout.styled';
import Table from './components/Table';

function App() {
  const { isLoading, isError, data } = useJsonData();

  if (isLoading) {
    return (
      <StyledLayout role="alert" aria-label="loading">
        <h1>Loading ...</h1>
      </StyledLayout>
    );
  }

  if (isError) {
    return (
      <StyledLayout>
        <h1>Something went wrong, can not load table data</h1>
      </StyledLayout>
    );
  }

  return <StyledLayout>{data && <Table tableData={data} />}</StyledLayout>;
}

export default App;
