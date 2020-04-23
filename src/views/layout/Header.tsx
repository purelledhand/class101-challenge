import React from 'react';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: rgb(238, 238, 239) 0px -1px 0px inset;
  padding: 0;
  margin: 0;
`;

export const HeaderContainer = styled.div`
  width: 1170px;
  max-width: 1170px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
`;

const Header: React.FC = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <img src='https://class101.net/images/class101-main-logo.svg' alt='class101 main logo' />
      <span>장바구니</span>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;
