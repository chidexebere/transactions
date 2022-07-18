import styled from 'styled-components';

export const StyledButton = styled.button<StyledBtn>`
  background: ${({ primary }) => (primary ? '#0096FF' : '')};
  color: ${({ primary }) => (primary ? 'white' : '#0096FF')};
  cursor: pointer;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: ${({ primary }) => (primary ? '2px solid #0096ff' : '0')};
  border-radius: 3px;

  &:hover {
    color: #484848;
  }

  & > span {
    margin-left: 1rem;
  }
`;
