import React from 'react';
import PropTypes from 'prop-types';

import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, AutoField } from 'uniforms-material';

import schema from '/imports/api/menu/schema';

const propTypes = {
  model: PropTypes.object, // TODO: better type
  handleClose: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

const schemaBridge = new SimpleSchemaBridge(schema);

const AutoFieldWithInlineErrors = (props) => <AutoField showInlineError {...props} />;
const HiddenSubmitField = () => <input type="submit" hidden />;
const ErrorsField = () => null;

const DialogForm = ({ model = {}, setForm, handleClose }) => {
  return (
    <AutoForm
      schema={schemaBridge}
      onSubmit={(data) => {
        handleClose({ _id: model._id, ...data });
      }}
      model={model}
      ref={(form) => setForm(form)}
      submitField={HiddenSubmitField}
      autoField={AutoFieldWithInlineErrors}
      errorsField={ErrorsField}
    />
  );
};

DialogForm.propTypes = propTypes;

export default DialogForm;
