import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import DialogForm from './DialogForm';

const propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  interactionModel: PropTypes.object, // TODO: better type
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
const Dialog = ({ dialogTitle, interactionModel = {}, open, handleClose }) => {
  const classes = useStyles();
  const [formInstance, setForm] = useState(null);
  return (
    <>
      <MuiDialog open={open} onClose={() => handleClose()}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogForm
            setForm={setForm}
            interactionModel={interactionModel}
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Abbrechen
          </Button>
          <Button
            onClick={() => {
              if (formInstance) {
                formInstance.submit();
              }
            }}
            color="primary"
          >
            Speichern
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};

const useStyles = makeStyles({
  avatar: {
    width: 65,
    height: 65,
  },
  list: {
    margin: 0,
  },
  dialogContent: {
    minWidth: 400,
  },
  hintText: {
    flexGrow: 1,
  },
});

Dialog.propTypes = propTypes;

export default Dialog;
