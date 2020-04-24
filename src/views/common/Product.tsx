import React from 'react';
import styled from 'styled-components';
import BarChartIcon from '@material-ui/icons/BarChart';
import CartButton from './CartButton';

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 216px;
  height: 320px;
`;

export const ProductCover = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 12px;
`;

export const ProductTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.15px;
  color: rgb(27, 28, 29);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductDisc = styled.div`
  font-size: 11px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: normal;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(133, 138, 141);
`;

export const ProductFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;

const Product: React.FC = () => (
  <ProductWrapper>
    <ProductCover src='https://cdn.class101.net/images/9e7be50d-72f1-4c93-80d6-c6b95b42bd40' />
    <ProductTitle>평범한 일상에 색을 더하는 시간, 자토의 아이패드 드로잉</ProductTitle>
    <ProductDisc>
      <BarChartIcon />
      300
    </ProductDisc>
    <ProductFooter>
      <div>50,000원</div>
      <CartButton inCart />
    </ProductFooter>
  </ProductWrapper>
);

export default Product;
