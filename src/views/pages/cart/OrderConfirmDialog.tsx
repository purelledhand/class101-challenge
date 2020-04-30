import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import BasicDialog from 'views/common/BasicDialog';
import { CartItem } from 'models/types';

interface OrderConfirmDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  orderedItems: Array<CartItem>;
}

const OrderConfirmDialog: React.FC<OrderConfirmDialogProps> = (props) => {
  const { open, handleClose, orderedItems } = props;
  const intl = useIntl();

  const renderOrderedItems = orderedItems.map((item) => (
    <OrderedItem key={item.id}>
      <span>{item.title} </span>x {item.quantity}{intl.formatMessage({ id: 'PRODUCT_UNIT' })}
    </OrderedItem>
  ));

  return (
    <BasicDialog
      title={intl.formatMessage({ id: 'ORDER_IS_COMPLETE' })}
      open={open}
      handleClose={handleClose}
    >
      {renderOrderedItems}
    </BasicDialog>
  );
};

const OrderedItem = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  &>span {
    color: #dc004e;
  }
`;

export default OrderConfirmDialog;
