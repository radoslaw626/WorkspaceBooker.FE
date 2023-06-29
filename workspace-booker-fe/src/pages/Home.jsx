import { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import MainContainer from '../layout/MainContainer';
import WorkspaceItem from '../components/InvoiceItem';
import FilterDropdown from '../components/FilterDropdown';
import NoInvoice from '../components/NoWorkspaces';

import { AppContext } from '../context/AppContext';
import { workspacesCountText } from '../utils/utils';

import deviceSize from '../styles/breakpoints';

const HomeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  & > div:first-child {
    margin-right: auto;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    margin-bottom: 3.5rem;
  }
  @media screen and (min-width: ${deviceSize.lg}) {
    margin-bottom: 4.0625rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.4375rem;
  @media screen and (min-width: ${deviceSize.md}) {
    font-size: 2rem;
  }
`;

const WorkspacesCount = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.color1};
  text-spacing: -0.25px;
`;

const WorkspacesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const workspaceListVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  }
};

const workspaceListItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};
function Home() {
  const { filteredWorkspaces, dispatch } = useContext(AppContext);
  return (
    <MainContainer>
      <HomeHeader>
        <div>
          <Heading>Workspaces</Heading>
          <WorkspacesCount>{workspacesCountText(filteredWorkspaces.length)}</WorkspacesCount>
        </div>
        <FilterDropdown />
      </HomeHeader>
      {filteredWorkspaces.length > 0 ? (
        <WorkspacesList
          as={motion.ul}
          variants={workspaceListVariants}
          initial="hidden"
          animate="visible">
          {filteredWorkspaces.map((workspace) => (
            <motion.li variants={workspaceListItemVariants} key={workspace.id}>
              <WorkspaceItem {...workspace} />
            </motion.li>
          ))}
        </WorkspacesList>
      ) : (
        <NoInvoice />
      )}
    </MainContainer>
  );
}

export default Home;
