import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, AutoField } from 'uniforms-material';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import ImageUrlInfoDialog from './ImageUrlInfoDialog';

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

  const [imageUrlDialogOpened, setImageUrlDialogOpened] = useState(false);
  const openImageUrlDialog = () => setImageUrlDialogOpened(true);
  const closeImageUrlDialog = () => setImageUrlDialogOpened(false);

  const close = (...args) => {
    handleClose(...args);
    setImageUrl(null);
    setName(null);
  };

  const image = imageUrl || candidateModel.imageUrl;

  return (
    <>
      <MuiDialog open={open} onClose={() => close()}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
            <Avatar src={image} className={classes.avatar}>
              {!image && name && name[0].toUpperCase()}
            </Avatar>
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
          >
            <AutoField name="name" showInlineError />
            <Box display="flex">
              <AutoField name="imageUrl" showInlineError />
              <Box width={48} display="flex" justifyContent="center" alignItems="center">
                <IconButton onClick={openImageUrlDialog}>
                  <InfoIcon />
                </IconButton>
              </Box>
            </Box>
          </AutoForm>
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
      <ImageUrlInfoDialog open={imageUrlDialogOpened} handleClose={closeImageUrlDialog} />
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
