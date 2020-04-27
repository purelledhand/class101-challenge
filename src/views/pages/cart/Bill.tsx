import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
import Button from '@material-ui/core/Button';
import OrderItem from './OrderItem';

const CartItem: React.FC = observer(() => {
  const { cart } = useMst();
  const intl = useIntl();

  return (
    <Wrapper>
      <Header>
        {intl.formatMessage({ id: 'ORDER_DETAILS' })}
      </Header>
      <Contents>
        <div>
          <ContentsTitle>
            {intl.formatMessage({ id: 'ORDER_PRODUCTS' })}
          </ContentsTitle>
          {cart.orderItems.map(({ title, price, quantity }) => (
            <OrderItem title={title} price={price} quantity={quantity} />
          ))}
        </div>
        <div>
          <ContentsTitle>
            {intl.formatMessage({ id: 'ORDER_DISCOUNTS' })}
          </ContentsTitle>
          {cart.orderItems.map(({ title, price, quantity }) => (
            <OrderItem title={title} price={price} quantity={quantity} />
          ))}
        </div>
        <Row>
          {cart.totalPrice} {intl.formatMessage({ id: 'KOREAN_WON' })}
        </Row>
      </Contents>
      <Footer>
        <Button fullWidth>
          {intl.formatMessage({ id: 'ORDER' })}
        </Button>
      </Footer>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 400px;
  height: 500px;
  box-sizing: border-box; 
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(143, 143, 143, 0.3);
`;

const Header = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: rgb(27, 28, 29);
  letter-spacing: -0.6px;
  margin: 0px;
`;

const ContentsTitle = styled(Header)`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 4px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 335px;
`;

const Footer = styled.div`
  width: 100%;
  & button{
    height: 40px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default CartItem;
