import { useJsonData } from './hooks';
import { StyledLayout } from './styles/Layout.styled';
import Table from './components/Table';

function App() {
  const { isLoading, isError, data } = useJsonData();

  if (isLoading) {
    return <StyledLayout>Loading ...</StyledLayout>;
  }

  if (isError) {
    return (
      <StyledLayout>Something went wrong, can not load JSON data</StyledLayout>
    );
  }

  return <StyledLayout>{data && <Table data={data} />}</StyledLayout>;
}

export default App;
