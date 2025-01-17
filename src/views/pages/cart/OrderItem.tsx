import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import addComma from 'utils/addComma';

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
      {addComma(price)}{intl.formatMessage({ id: 'KOREAN_WON' })}x
      {quantity}{intl.formatMessage({ id: 'PRODUCT_UNIT' })}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  font-size: 13px;
  margin-bottom: 12px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductTitle = styled(Row)`
  color: #dc004e;
  display: inline-block;
  width: 228px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default OrderItem;
