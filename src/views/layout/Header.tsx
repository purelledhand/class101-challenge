import React from 'react';
import Path from 'routes/Path';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header: React.FC = () => (
  <Wrapper>
    <Container>
      <NavLink to={Path.Home}>
        <img src='https://class101.net/images/class101-main-logo.svg' alt='class101 main logo' />
      </NavLink>
      <Navigator>
        <NavLink to={Path.Products}>
          클래스
        </NavLink>
        <NavLink to={Path.Cart}>
          장바구니
        </NavLink>
      </Navigator>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: rgb(238, 238, 239) 0px -1px 0px inset;
  padding: 0;
  margin: 0;
`;

const Container = styled.div`
  width: 1170px;
  max-width: 1170px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
`;

const Navigator = styled.div`
  & a {
    margin-right: 10px;
  }

  & a:last-child {
    margin-right: 0;
  }
`;

export default Header;
