import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

interface OrderItemProps {
  title: string;
  price: number;
  quantity: number;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  const { title, price, quantity } = props;
  const intl = useIntl();

  return (
    <Wrapper>
      <ProductTitle>
        {title}
      </ProductTitle>
      {price}{intl.formatMessage({ id: 'KOREAN_WON' })}x
      {quantity}{intl.formatMessage({ id: 'PRODUCT_UNIT' })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  font-size: 13px;
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProductTitle = styled(Row)`
  font-size: 12px;
  color: #dc004e;
`;

export default OrderItem;
