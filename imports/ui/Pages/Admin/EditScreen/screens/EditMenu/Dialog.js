import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, AutoField } from 'uniforms-material';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import schema from '/imports/api/menu/schema';

const propTypes = {
  title: PropTypes.string.isRequired,
  menuModel: PropTypes.object, // TODO: better type
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const schemaBridge = new SimpleSchemaBridge(schema);

const AutoFieldWithInlineErrors = (props) => <AutoField showInlineError {...props} />;
const HiddenSubmitField = () => <input type="submit" hidden />;
const ErrorsField = () => null;

// eslint-disable-next-line import/prefer-default-export
const Dialog = ({ title, menuModel = {}, open, handleClose }) => {
  const classes = useStyles();
  const [formInstance, setForm] = useState(null);
  const close = (...args) => {
    handleClose(...args);
  };

  return (
    <MuiDialog open={open} onClose={() => close()}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <AutoForm
          schema={schemaBridge}
          onSubmit={(data) => {
            close({ _id: menuModel._id, ...data });
          }}
          model={menuModel}
          ref={(form) => setForm(form)}
          submitField={HiddenSubmitField}
          autoField={AutoFieldWithInlineErrors}
          errorsField={ErrorsField}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()} color="primary">
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
  );
};

const useStyles = makeStyles({
  dialogContent: {
    minWidth: 400,
  },
});

Dialog.propTypes = propTypes;

export default Dialog;
