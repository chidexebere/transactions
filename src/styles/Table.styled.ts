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
  tfoot > tr {
    font-weight: bold;
  }
  caption {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: bold;
    text-align: left;
  }

  @media (max-width: 640px) {
    thead {
      display: none;
    }
    td {
      display: block;

      :nth-of-type(odd) {
        text-align: left;
      }
      :nth-of-type(even) {
        text-align: left;
      }
    }
    td:first-child {
      font-weight: bold;
      margin: 1rem 0 0.5rem;
    }
  }
`;
