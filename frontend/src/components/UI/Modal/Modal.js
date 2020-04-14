import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { subscribeToUser } from '../../../store/actions/usersActions';

export default function Modal({open, close}) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    setName(e.target.value);
  };

  const subscribe = () => {
    close()
    dispatch(subscribeToUser({subscribeName: name}));
  }

  console.log(name)
  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to user, please enter his username here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subscribe to user"
            type="name"
            fullWidth
            onChange={onChange}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={subscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}