import React from 'react';
import { useIntl } from 'react-intl';
import { Header, Title, SubTitle } from 'views/layout/layoutStyles';
import styled from 'styled-components';


const Cart: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <Header>
        <Title>
          {intl.formatMessage({ id: 'CART_PAGE_TITLE' })}
        </Title>
        <SubTitle>
          {intl.formatMessage({ id: 'CART_PAGE_SUBTITLE' })}
        </SubTitle>
      </Header>
      <CartContainer>
        <CartItems>
          <CartItem />
          <CartItem />
          <CartItem />
        </CartItems>
        <CartBill />
      </CartContainer>
    </>
  );
};

export const CartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const CartItems = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

export const CartItem = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 3px 10px rgba(143, 143, 143, 0.3);
`;

export const CartBill = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(143, 143, 143, 0.3);
`;

export default Cart;
