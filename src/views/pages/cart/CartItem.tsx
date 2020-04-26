import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import { Delete, Add, Remove } from '@material-ui/icons';
import { useMst } from 'models/Root';

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  availableCoupon: boolean;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const { id, title, price, availableCoupon } = props;
  const { cart } = useMst();
  const intl = useIntl();
  const [checked, setChecked] = useState(true);

  return (
    <Wrapper>
      <Row>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={() => setChecked((prev) => !prev)} />}
          label={title}
        />
        <RightSide>
          <div>
            <IconButton>
              <Remove fontSize='small' />
            </IconButton>
            1
            <IconButton>
              <Add fontSize='small' />
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
        <MessageRow>
          {intl.formatMessage({ id: 'COUPON_IS_NOT_AVAILABLE' })}
        </MessageRow>
      )}
    </Wrapper>
  );
};

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
