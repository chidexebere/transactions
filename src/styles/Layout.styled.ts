import styled from 'styled-components';

export const StyledLayout = styled.div`
  display: grid;
  place-items: center;
  margin: 2rem 0;

  @media (max-width: 640px) {
    display: block;
    margin: 4rem 2rem;
  }
`;

export const StyledRightNav = styled.nav`
  font-size: 3rem;
  text-align: right;
`;

export const StyledLeftNav = styled.nav`
  font-size: 3rem;
  text-align: left;
`;
