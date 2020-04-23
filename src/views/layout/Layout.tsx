import React from 'react';
import styled from 'styled-components';
import Header from './Header';

export const ContentLayout = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      max-width: 1220px;
      margin: 0 auto;
`;

const Layout: React.FC = ({ children }) => (
  <ContentLayout>
    <Header />
    {children}
  </ContentLayout>
);

export default Layout;
