import React from 'react';
import { useIntl } from 'react-intl';
import addComma from 'utils/addComma';
import styled from 'styled-components';
import { Wrapper, ProductTitle as Title } from './OrderItem';

interface DisCountItemProps {
  title: string;
  price: number;
}

const DisCountItem: React.FC<DisCountItemProps> = (props) => {
  const { title, price } = props;
  const intl = useIntl();

  return (
    <Wrapper>
      <ProductTitle>
        {title}
      </ProductTitle>
      {intl.formatMessage({ id: 'DISCOUNTS_AMOUNT' })} {addComma(price)}
      {intl.formatMessage({ id: 'KOREAN_WON' })}
    </Wrapper>
  );
};

const ProductTitle = styled(Title)`
  width: 200px;
`;

export default DisCountItem;
