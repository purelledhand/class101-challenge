import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
import Button from '@material-ui/core/Button';
import addComma from 'utils/addComma';
import { Coupon } from 'models/types';
import OrderItem from './OrderItem';
import DiscountItem from './DiscountItem';
import OrderConfirmDialog from './OrderConfirmDialog';

interface BillProps {
  coupon: Coupon | undefined;
}

const Bill: React.FC<BillProps> = observer((props) => {
  const { coupon } = props;
  const [orderConfirmDialogOpen, setOrderedConfirmDialogOpen] = useState(false);
  const { cart } = useMst();
  const intl = useIntl();

  const handleOrderConfirmDialogClose = () => {
    setOrderedConfirmDialogOpen(false);
    cart.empty();
  };

  const renderOrderItems = cart.checkedItems.map((item) => {
    const { title, price, quantity } = item;

    return (
      <OrderItem
        title={title}
        price={price}
        quantity={quantity}
      />
    );
  });

  return (
    <Wrapper>
      <Header>
        {intl.formatMessage({ id: 'ORDER_DETAILS' })}
      </Header>
      <Contents>
        <div>
          <ContentTitle>
            {intl.formatMessage({ id: 'ORDER_PRODUCTS' })}
          </ContentTitle>
          {renderOrderItems}
        </div>
        <div>
          <ContentTitle>
            {intl.formatMessage({ id: 'ORDER_DISCOUNTS' })}
          </ContentTitle>
          <DiscountItem
            title={coupon === undefined ? intl.formatMessage({ id: 'NO_COUPONS_APPLIED' }) : coupon.title}
            price={cart.discountPrice(coupon)}
          />
        </div>
        <ContentsFooter>
          <div>
            {addComma(cart.totalPrice)}{intl.formatMessage({ id: 'KOREAN_WON' })} - {addComma(cart.discountPrice(coupon))}{intl.formatMessage({ id: 'KOREAN_WON' })}
          </div>
          {intl.formatMessage({ id: 'TOTAL_PAYMENT_AMOUNT' })} {addComma(cart.totalPrice - cart.discountPrice(coupon))}
          {intl.formatMessage({ id: 'KOREAN_WON' })}
        </ContentsFooter>
      </Contents>
      <Footer>
        <Button fullWidth onClick={() => setOrderedConfirmDialogOpen(true)}>
          {intl.formatMessage({ id: 'ORDER' })}
        </Button>
      </Footer>
      <OrderConfirmDialog
        orderedItems={cart.checkedItems}
        open={orderConfirmDialogOpen}
        handleClose={handleOrderConfirmDialogClose}
      />
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

const ContentTitle = styled(Header)`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 12px;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 335px;
  &>div {
    min-height: 130px;
  }
  &>div:last-child {
    min-height: 40px;
  }
`;

const Footer = styled.div`
  width: 100%;
  &>.MuiButton-root{
    background-color: #F7F7F7;
  }
`;

const ContentsFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: bold;
  font-size: 18px;
  &>div:first-child {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 16px;
  }
`;

export default Bill;
