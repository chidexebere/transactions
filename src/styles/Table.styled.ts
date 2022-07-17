import styled from 'styled-components';

export const StyledTable = styled.table`
  border: none;
  border-collapse: collapse;
  font-size: 1.5rem;

  td,
  th {
    border: none;
  }

  td {
    padding: 2rem;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: bold;
    text-align: left;
  }
`;
