import React from 'react';
import PropTypes from 'prop-types';

import { AutoFields } from 'uniforms-material';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';

import schema from '/imports/api/menu/schema';
import AutoForm from '/imports/ui/Pages/Admin/EditScreen/components/AutoFormWithDefaultFields';
import { makeDialog } from '/imports/ui/Pages/Admin/EditScreen/components/Dialog/makeDialog';

const propTypes = {
  model: PropTypes.object, // TODO: better type
  handleClose: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

const schemaBridge = new SimpleSchemaBridge(schema);

const DialogForm = ({ model = {}, setForm, handleClose }) => {
  return (
    <AutoForm
      schema={schemaBridge}
      onSubmit={(data) => {
        handleClose({ _id: model._id, ...data });
      }}
      model={model}
      ref={(form) => setForm(form)}
    >
      {/* sortIndex is set using sorting */}
      <AutoFields omitFields={['sortIndex']} />
      <input type="submit" hidden />
    </AutoForm>
  );
};

DialogForm.propTypes = propTypes;

export default makeDialog(DialogForm);
