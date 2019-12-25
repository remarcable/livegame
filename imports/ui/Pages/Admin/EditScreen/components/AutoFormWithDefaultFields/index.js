import React from 'react';
import { AutoForm, AutoField } from 'uniforms-material';

const AutoFieldWithInlineErrors = (props) => <AutoField showInlineError {...props} />;
const HiddenSubmitField = () => <input type="submit" hidden />;
const ErrorsField = () => null;

const AutoFormWithDefaultFields = React.forwardRef((props, ref) => {
  return (
    <AutoForm
      ref={ref}
      submitField={HiddenSubmitField}
      autoField={AutoFieldWithInlineErrors}
      errorsField={ErrorsField}
      {...props}
    />
  );
});

export default AutoFormWithDefaultFields;
