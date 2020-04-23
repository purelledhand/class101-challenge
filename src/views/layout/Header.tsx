import React from 'react';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
      width: 100%;
      height: 50px;
      max-width: 1220px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
`;

const Header: React.FC = () => (
  <HeaderContainer>
    <img src='https://class101.net/images/class101-main-logo.svg' alt='class101 main logo' />
    <span>장바구니</span>
  </HeaderContainer>
);

export default Header;
