import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faHouse} from '@fortawesome/free-solid-svg-icons'
import { faDesktop} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

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

const WorkersLink = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.button.bg};
  color: ${({ theme }) => theme.button.text};
  border-radius: 4px;
  text-decoration: none;
`;

function Header() {
  return (
    <HeaderContainer>
        <WorkersLink  to="/"><FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} /></WorkersLink>
        <WorkersLink to="/workers"><FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} /></WorkersLink>
        <WorkersLink to="/workspaces"><FontAwesomeIcon icon={faDesktop} style={{color: "#ffffff",}} /></WorkersLink>
        <WorkersLink to="/addworkspacebooking"><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /></WorkersLink>
      <ThemeToggleButton />
    </HeaderContainer>
  );
}

export default Header;
