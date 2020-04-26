import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <ContentLayout>
      {children}
    </ContentLayout>
  </>
);

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
`;

export default Layout;
