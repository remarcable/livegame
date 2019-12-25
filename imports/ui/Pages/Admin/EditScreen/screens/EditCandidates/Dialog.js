import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, AutoField } from 'uniforms-material';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import { makeDialog } from '/imports/ui/Pages/Admin/EditScreen/components/Dialog/makeDialog';

import ImageUrlInfoDialog from './ImageUrlInfoDialog';

const propTypes = {
  model: PropTypes.object, // TODO: better type
  handleClose: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

const schema = new SimpleSchema({
  name: { type: String, label: 'Name' },
  imageUrl: { type: String, label: 'Bild-URL', regEx: SimpleSchema.RegEx.Url },
});

const schemaBridge = new SimpleSchemaBridge(schema);

const DialogForm = ({ setForm, handleClose, model }) => {
  const classes = useStyles();

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

  const image = imageUrl || model.imageUrl;

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
        <Avatar src={image} className={classes.avatar}>
          {!image && name && name[0].toUpperCase()}
        </Avatar>
      </Box>
      <AutoForm
        schema={schemaBridge}
        onSubmit={(data) => {
          close({ _id: model._id, ...data });
        }}
        model={{ name: model.name, imageUrl: model.imageUrl }}
        ref={(form) => setForm(form)}
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
        <input type="submit" hidden />
      </AutoForm>
      <ImageUrlInfoDialog open={imageUrlDialogOpened} handleClose={closeImageUrlDialog} />
    </>
  );
};

const useStyles = makeStyles({
  avatar: {
    width: 65,
    height: 65,
  },
});

DialogForm.propTypes = propTypes;

export default makeDialog(DialogForm);
