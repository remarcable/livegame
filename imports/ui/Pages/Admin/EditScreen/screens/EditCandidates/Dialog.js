import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-material/AutoForm';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hintText } from './hintText';

const propTypes = {
  title: PropTypes.string.isRequired,
  candidateModel: PropTypes.object, // TODO: better type
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const schema = new SimpleSchema({
  name: { type: String, label: 'Name' },
  imageUrl: { type: String, label: 'Bild-URL', regEx: SimpleSchema.RegEx.Url },
});

const schemaBridge = new SimpleSchemaBridge(schema);

// eslint-disable-next-line import/prefer-default-export
const Dialog = ({ title, candidateModel = {}, open, handleClose }) => {
  const classes = useStyles();

  const [formInstance, setForm] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(null);

  const close = (...args) => {
    handleClose(...args);
    setImageUrl(null);
    setName(null);
  };

  const image = imageUrl || candidateModel.imageUrl;

  return (
    <MuiDialog open={open} onClose={() => close()} className={classes.dialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
          <Box mr={3}>
            <Avatar src={image} className={classes.avatar}>
              {!image && name && name[0].toUpperCase()}
            </Avatar>
          </Box>
          <DialogContentText className={classes.hintText}>{hintText}</DialogContentText>
        </Box>
        <AutoForm
          schema={schemaBridge}
          onSubmit={(data) => {
            close({ _id: candidateModel._id, ...data });
          }}
          model={{ name: candidateModel.name, imageUrl: candidateModel.imageUrl }}
          ref={(form) => setForm(form)}
          submitField={() => <input type="submit" hidden />}
          onChange={(key, value) => {
            // for automatically updaing the avatar
            if (key === 'imageUrl') {
              setImageUrl(value);
            }

            if (key === 'name') {
              setName(value);
            }
          }}
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
  avatar: {
    width: 65,
    height: 65,
  },
  list: {
    margin: 0,
  },
  dialog: {
    minWidth: 400,
  },
  hintText: {
    flexGrow: 1,
  },
});

Dialog.propTypes = propTypes;

export default Dialog;
