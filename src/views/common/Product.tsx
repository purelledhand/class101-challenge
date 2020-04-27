import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
import CartButton from './CartButton';

interface ProductProps {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}

// TODO: 이미지소스 받아오기 전동안 렌더링 해줄 placeholder 셋팅
// TODO: 마운트 될 때 fadein 효과 추가
const Product: React.FC<ProductProps> = observer((props) => {
  const { cart } = useMst();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const {
    id, title, coverImage, price, score, availableCoupon,
  } = props;
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    setIsInCart(cart.isExist(id));
  }, [cart, id]);

  const onClick = (): void => {
    if (isInCart) {
      // eslint-disable-next-line no-unused-expressions
      cart.getItem(id)?.remove();
      enqueueSnackbar(intl.formatMessage({ id: 'REMOVED_FROM_CART' }));
    } else {
      if (cart.countItems >= 3) {
        enqueueSnackbar(intl.formatMessage({ id: 'CART_IS_FULL' }));
        return;
      }
      cart.addItem({
        id,
        title,
        price,
        availableCoupon,
        quantity: 1,
        checkOrder: true,
      });
      enqueueSnackbar(intl.formatMessage({ id: 'ADDED_TO_CART' }));
    }
    setIsInCart((prev) => !prev);
  };

  return (
    <Wrapper>
      <Cover src={coverImage} />
      <Title>{title}</Title>
      <Disc>
        <BarChartIcon fontSize="small" />
        {score}
      </Disc>
      <Footer>
        <div>
          {price}
          {intl.formatMessage({ id: 'KOREAN_WON' })}
        </div>
        <CartButton isInCart={isInCart} onClick={onClick} />
      </Footer>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 216px;
  height: 320px;
`;

const Cover = styled.img`
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

const Title = styled.div`
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

const Disc = styled.div`
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

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;

export default Product;
