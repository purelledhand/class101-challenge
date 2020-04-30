import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import coupons from 'rawdata/coupons';
import { useIntl } from 'react-intl';
import { Coupon } from 'models/types';

interface SelectCouponDialogProps {
  open: boolean;
  selectedValue: Coupon | undefined;
  isApplicable: boolean;
  onClose: (value: Coupon | undefined) => void;
}

const SelectCouponDialog = (props: SelectCouponDialogProps) => {
  const { onClose, selectedValue, isApplicable, open } = props;
  const intl = useIntl();

  const renderCoupons = coupons.map((coupon) => (
    <ListItem button key={coupon.title} onClick={() => onClose(coupon)}>
      <ListItemText primary={coupon.title} />
    </ListItem>
  ));

  return (
    <Dialog onClose={() => onClose(selectedValue)} open={open}>
      <DialogTitle>
        {isApplicable ? intl.formatMessage({ id: 'SELECT_COUPON' }) : intl.formatMessage({ id: 'NO_PRODUCTS_AVAILABLE_COUPON' })}
      </DialogTitle>
      <List>
        {isApplicable && renderCoupons}
        <ListItem button onClick={() => onClose(undefined)}>
          <ListItemText primary={intl.formatMessage({ id: 'CANCEL' })} />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default SelectCouponDialog;
