import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';

const CartItem: React.FC = observer(() => {
  const { cart } = useMst();
  const intl = useIntl();

  return (
    <Wrapper>
      {cart.orderItems.map((item) => (
        <div>
          {item.title}

          {item.price}*
          {intl.formatMessage({ id: 'QUANTITY' })}: {item.quantity}
        </div>
      ))}
      {cart.totalPrice} {intl.formatMessage({ id: 'KOREAN_WON' })}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 400px;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(143, 143, 143, 0.3);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightSide = styled(Row)`
  width: 250px;
`;

const MessageRow = styled(Row)`
  font-size: 12px;
  color: #dc004e;
`;

export default CartItem;
