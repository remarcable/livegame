import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const propTypes = {
  title: PropTypes.string.isRequired,
  model: PropTypes.object, // TODO: better type
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  AdditionalContent: PropTypes.element,
};

export const makeDialog = (DialogForm) => {
  const Dialog = ({ title, model = {}, open, handleClose, AdditionalContent = null }) => {
    const classes = useStyles();
    const [formInstance, setForm] = useState(null);
    return (
      <>
        <MuiDialog open={open} onClose={() => handleClose()}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            {AdditionalContent && <AdditionalContent />}
            <DialogForm setForm={setForm} model={model} handleClose={handleClose} />
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

  Dialog.propTypes = propTypes;

  return Dialog;
};

const useStyles = makeStyles({
  dialogContent: {
    minWidth: 400,
  },
});
