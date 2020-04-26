import React, { useState } from 'react';
import styled from 'styled-components';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
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
  border-radius: 5px;
  margin-bottom: 12px;
  transition: opacity 0.1s linear 0s;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

export const ProductTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  height: 44px;
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
  justify-content: center;
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

interface ProductProps {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}

// TODO: 이미지소스 받아오기 전동안 렌더링 해줄 placeholder 셋팅
// TODO: 마운트 될 때 fadein 효과 추가\
const Product: React.FC<ProductProps> = observer((props) => {
  const { cart } = useMst();
  const { enqueueSnackbar } = useSnackbar();
  const {
    id, title, coverImage, price, score, availableCoupon,
  } = props;
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const onClick = (): void => {
    cart.addItem({
      id,
      title,
      price,
      availableCoupon,
    });

    setIsInCart((prev) => !prev);
    enqueueSnackbar(cart.listIds);
    enqueueSnackbar('장바구니에 상품을 담았습니다.');
  };

  return (
    <ProductWrapper>
      <ProductCover src={coverImage} />
      <ProductTitle>{title}</ProductTitle>
      <ProductDisc>
        <BarChartIcon fontSize="small" />
        {score}
      </ProductDisc>
      <ProductFooter>
        <div>{price}원</div>
        <CartButton isInCart={isInCart} onClick={onClick} />
      </ProductFooter>
    </ProductWrapper>
  );
});

export default Product;
