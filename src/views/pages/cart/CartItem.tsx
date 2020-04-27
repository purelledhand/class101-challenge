import React from 'react';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import { FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import { Delete, Add, Remove } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { useMst } from 'models/Root';
import { maximumQuantity } from 'utils/consts';

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  availableCoupon: boolean;
  checkOrder: boolean;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = observer((props) => {
  const { id, title, price, availableCoupon, checkOrder, quantity } = props;
  const { cart } = useMst();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const handleToggleOrder = () => {
    // eslint-disable-next-line no-unused-expressions
    cart.getItem(id)?.toggleOrder();
    // eslint-disable-next-line no-console
    console.log(cart.getItem(id));
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= 10) {
      enqueueSnackbar(intl.formatMessage({ id: 'EXCEEDED_MAXIMUM_QUANTITY' }, { maximumQuantity }));
      return;
    }
    cart.getItem(id)?.increaseQuantity();
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      enqueueSnackbar(intl.formatMessage({ id: 'EXCEEDED_MINIMUM_QUANTITY' }));
      return;
    }
    cart.getItem(id)?.decreaseQuantity();
  };

  return (
    <Wrapper>
      <Row>
        <FormControlLabel
          control={
            <Checkbox checked={checkOrder} onChange={handleToggleOrder} />
          }
          label={title}
        />
        <RightSide>
          <div>
            <IconButton onClick={handleDecreaseQuantity}>
              <Remove fontSize="small" />
            </IconButton>
            {quantity}
            <IconButton onClick={handleIncreaseQuantity}>
              <Add fontSize="small" />
            </IconButton>
          </div>
          <div>
            {price}
            {intl.formatMessage({ id: 'KOREAN_WON' })}
          </div>
          <IconButton>
            <Delete onClick={() => cart.getItem(id)?.remove()} />
          </IconButton>
        </RightSide>
      </Row>
      {availableCoupon ? null : (
        <MessageRow>{intl.formatMessage({ id: 'COUPON_IS_NOT_AVAILABLE' })}</MessageRow>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 28px;
  box-sizing: border-box;
  width: 100%;
  height: 88px;
  border-radius: 8px;
  margin-bottom: 25px;
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
