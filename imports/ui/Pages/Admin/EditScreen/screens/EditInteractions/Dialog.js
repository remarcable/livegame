import React from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';

import interactionTypes from '/imports/api/interactions/types';

import AutoForm from '/imports/ui/Pages/Admin/EditScreen/components/AutoFormWithDefaultFields';
import { makeDialog } from '/imports/ui/Pages/Admin/EditScreen/components/Dialog/makeDialog';

import CustomAutoField from './CustomAutoField';

const propTypes = {
  model: PropTypes.object, // TODO: better type
  handleClose: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

const DialogForm = ({ model, handleClose, setForm }) => {
  const interactionType = interactionTypes.get(model.type);
  if (!interactionType) {
    return null;
  }

  const { schemaKey } = interactionType;
  const schema = new SimpleSchema({
    title: {
      type: String,
      label: 'Titel',
    },
    ...interactionType.getFieldDefinitions(),
  });
  const schemaBridge = new SimpleSchemaBridge(schema);

  return (
    <AutoForm
      schema={schemaBridge}
      ref={(form) => setForm(form)}
      model={{ title: model.title || '', ...model[schemaKey] }}
      onSubmit={({ title, ...data }) => handleClose({ id: model._id, title, data })}
      autoField={CustomAutoField}
    />
  );
};

DialogForm.propTypes = propTypes;

export default makeDialog(DialogForm);
