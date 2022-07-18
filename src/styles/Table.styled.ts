import styled from 'styled-components';

export const StyledTable = styled.table`
  font-family: monospace, monospace;
  border: none;
  border-collapse: collapse;
  font-size: 1.5rem;
  box-shadow: 0 8px 6px -4px gray;
  width: 100%;

  td,
  th {
    border: none;
    text-align: centre;
    :nth-of-type(1) {
      text-align: left;
    }
  }

  td {
    padding: 2rem;
    :nth-of-type(1) {
      padding-right: 8rem;
    }
    :nth-of-type(3) {
      text-align: right;
    }
    :nth-of-type(4) {
      text-align: right;
    }
  }

  tbody tr {
    :nth-of-type(even) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #efefef;
  }
  caption {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: bold;
    text-align: left;
  }
`;
