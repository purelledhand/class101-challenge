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
  isInCart: boolean;
  onClick: VoidFunction;
}

const CartButton: React.FC<CartButtonProps> = (props) => {
  const { isInCart, onClick } = props;

  return isInCart ? (
    <IconButton onClick={onClick}>
      <RemoveShoppingCartOutlinedIcon />
    </IconButton>
  ) : (
    <IconButton onClick={onClick}>
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default CartButton;
