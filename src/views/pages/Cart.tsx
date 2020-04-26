import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

export const CollectionHeader = styled.div`
  width: 100%;
  height: 192px;
  display: flex;
  flex-direction: column;
  padding-top: 72px;
  box-sizing: border-box;
`;

export const CollectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: rgb(27, 28, 29);
  line-height: 52px;
  letter-spacing: -0.6px;
  margin: 0px;
`;

export const CollectionSubTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  color: rgb(62, 64, 66);
  line-height: 28px;
  letter-spacing: -0.3px;
  margin: 0px;
`;

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

const Cart: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <CollectionHeader>
        <CollectionTitle>
          {intl.formatMessage({ id: 'CART_PAGE_TITLE' })}
        </CollectionTitle>
        <CollectionSubTitle>
          {intl.formatMessage({ id: 'CART_PAGE_SUBTITLE' })}
        </CollectionSubTitle>
      </CollectionHeader>
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

export default Cart;
