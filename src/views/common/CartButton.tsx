import React from 'react';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import styled from 'styled-components';

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 216px;
  height: 320px;
`;

interface CartButtonProps {
  inCart: boolean;
}

const CartButton: React.FC<CartButtonProps> = (props) => {
  const { inCart } = props;

  return inCart ? (
    <IconButton>
      <RemoveShoppingCartOutlinedIcon />
    </IconButton>
  ) : (
    <IconButton>
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default CartButton;
