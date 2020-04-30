import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Header, Title, SubTitle } from 'views/layout/layoutStyles';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
import styled from 'styled-components';
import addComma from 'utils/addComma';
import Button from '@material-ui/core/Button';
import { Coupon } from 'models/types';
import CartItem from './cart/CartItem';
import Bill from './cart/Bill';
import SelectCouponDialog from './cart/SelectCouponDialog';

const Cart: React.FC = observer(() => {
  const { cart } = useMst();
  const intl = useIntl();
  const [selectCouponDialogopen, setSelectCouponDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();

  useEffect(() => {
    cart.couponApplicableItems.length === 0 && setSelectedCoupon(undefined);
  }, [cart.couponApplicableItems]);

  const handleSelectCouponDialogClose = (value: Coupon | undefined) => {
    setSelectCouponDialogOpen(false);
    setSelectedCoupon(value);
  };

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
        <CartContents>
          <CartItems>
            { cart.countItems ? renderCartItems : intl.formatMessage({ id: 'CART_IS_EMPTY' }) }
          </CartItems>
          <CartFooter>
            <CouponContainer>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setSelectCouponDialogOpen(true)}
              >
                {intl.formatMessage({ id: 'APPLY_COUPON' })}
              </Button>
              {selectedCoupon === undefined ? intl.formatMessage({ id: 'NO_COUPONS_APPLIED' }) : selectedCoupon.title}
            </CouponContainer>
            {intl.formatMessage({ id: 'TOTAL_PAYMENT_AMOUNT' })} {selectedCoupon ? addComma(cart.totalPrice - cart.discountPrice(selectedCoupon)) : addComma(cart.totalPrice)}
            {intl.formatMessage({ id: 'KOREAN_WON' })}
          </CartFooter>
        </CartContents>
        <Bill coupon={selectedCoupon} />
      </CartContainer>
      <SelectCouponDialog
        selectedValue={selectedCoupon}
        isApplicable={cart.couponApplicableItems.length > 0}
        open={selectCouponDialogopen}
        onClose={handleSelectCouponDialogClose}
      />
    </>
  );
});

const CartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const CartContents = styled.div`
  width: 770px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 40px;
  padding-bottom: 20px;
`;

const CartItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CartFooter = styled(Title)`
  font-size: 24px;
`;

const CouponContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 400;
  height: 44px;
  align-items: center;
  width: 240px;
  margin-bottom: 10px;
  & button {
    margin-right: 10px;
  }
`;

export default Cart;
