import React from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-material/AutoForm';
import AutoField from 'uniforms-material/AutoField';

import interactionTypes from '/imports/api/interactions/types';

const propTypes = {
  interactionModel: PropTypes.object, // TODO: better type
  handleClose: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

const AutoFieldWithInlineErrors = (props) => <AutoField showInlineError {...props} />;
const HiddenSubmitField = () => <input type="submit" hidden />;
const ErrorsField = () => null;

const DialogForm = ({ interactionModel, handleClose, setForm }) => {
  const interactionType = interactionTypes.get(interactionModel.type);
  if (!interactionType) {
    return null;
  }

  const { schemaKey } = interactionType;
  const schema = new SimpleSchema({
    title: {
      type: String,
      label: 'Titel',
    },
    ...interactionType.getFields(),
  });
  const schemaBridge = new SimpleSchemaBridge(schema);

  return (
    <AutoForm
      schema={schemaBridge}
      ref={(form) => setForm(form)}
      model={{ title: interactionModel.title || '', ...interactionModel[schemaKey] }}
      onSubmit={({ title, ...data }) => handleClose({ id: interactionModel._id, title, data })}
      submitField={HiddenSubmitField}
      autoField={AutoFieldWithInlineErrors}
      errorsField={ErrorsField}
    />
  );
};

DialogForm.propTypes = propTypes;

export default DialogForm;
