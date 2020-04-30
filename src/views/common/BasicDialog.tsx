import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface BasicDialogProps {
  title: string;
  open: boolean;
  handleClose: VoidFunction;
}

const BasicDialog: React.FC<BasicDialogProps> = (props) => {
  const { children, title, open, handleClose } = props;
  const intl = useIntl();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogWrapper>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary' autoFocus>
            {intl.formatMessage({ id: 'CONFIRM' })}
          </Button>
        </DialogActions>
      </DialogWrapper>
    </Dialog>
  );
};

const DialogWrapper = styled.div`
  padding: 8px 12px;
`;

export default BasicDialog;
