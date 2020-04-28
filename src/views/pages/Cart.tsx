import React from 'react';
import { useIntl } from 'react-intl';
import { Header, Title, SubTitle } from 'views/layout/layoutStyles';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
import styled from 'styled-components';
import CartItem from './cart/CartItem';
import Bill from './cart/Bill';

const Cart: React.FC = observer(() => {
  const { cart } = useMst();
  const intl = useIntl();

  const renderCartItems = cart.getItems.map((item) => {
    const { id, title, price, availableCoupon, checkOrder, quantity } = item;

    return (
      <CartItem
        id={id}
        title={title}
        price={price}
        availableCoupon={availableCoupon}
        checkOrder={checkOrder}
        quantity={quantity}
      />
    );
  });

  return (
    <>
      <Header>
        <Title>
          {intl.formatMessage({ id: 'PAGE_TITLE_CART' })}
        </Title>
        <SubTitle>
          {intl.formatMessage({ id: 'PAGE_SUBTITLE_CART' })}
        </SubTitle>
      </Header>
      <CartContainer>
        <CartItems>
          { cart.countItems ? renderCartItems : intl.formatMessage({ id: 'CART_IS_EMPTY' }) }
        </CartItems>
        <Bill />
      </CartContainer>
    </>
  );
});

const CartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const CartItems = styled.div`
  width: 770px;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

export default Cart;
