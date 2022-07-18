import styled from 'styled-components';

export const StyledSelect = styled.select`
  width: 300px;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: 1px solid blue;
  margin-left: auto;
  display: flex;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const SelectWrapper = styled.div`
  text-align: right;
  width: 60rem;
`;
