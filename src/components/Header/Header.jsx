import styled from 'styled-components';

import ThemeToggleButton from './ThemeToggleButton';

import deviceSize from '../../styles/breakpoints';


const HeaderContainer = styled.header`
  position: relative;
  background-color: ${({ theme }) => theme.header.bg};
  display: flex;
  z-index: 8000;
  @media screen and (min-width: ${deviceSize.lg}) {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 6.4375rem;
    height: 100%;
    border-radius: 0 1.25rem 1.25rem 0;
  }
`;


function Header() {
  return (
    <HeaderContainer>
      <ThemeToggleButton />
    </HeaderContainer>
  );
}

export default Header;
