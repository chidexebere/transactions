import styled from 'styled-components';

export const StyledSelect = styled.select`
  width: 20rem;
  background: #bbb;
  color: black;
  padding: 0.5rem;
  font-size: 1.5rem;
  border: 1px solid #bbb;
  margin-left: 2rem;
  border-radius: 3px;

  option {
    color: black;
    background: white;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }

  @media (max-width: 640px) {
    width: 50%;
  }
`;

export const SelectWrapper = styled.div`
  text-align: right;
  width: 60rem;
  margin: 4rem 0;

  label {
    font-size: 1.5rem;
  }

  @media (max-width: 640px) {
    text-align: none;
    width: 100%;
  }
`;
