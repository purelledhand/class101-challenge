import React from 'react';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';

interface CartButtonProps {
  isInCart: boolean;
  onClick: VoidFunction;
}

const CartButton: React.FC<CartButtonProps> = (props) => {
  const { isInCart, onClick } = props;

  return (
    <IconButton onClick={onClick}>
      {isInCart ? <RemoveShoppingCartOutlinedIcon /> : <AddShoppingCartIcon />}
    </IconButton>
  );
};

export default CartButton;
