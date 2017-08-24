import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import { blueGrey900 } from 'material-ui/styles/colors';

const propTypes = {
  question: PropTypes.string.isRequired,
};

const EditFields = ({ question }) => (
  <div style={textFieldWrapperStyles}>
    <TextField
      autoFocus
      fullWidth
      required
      name="question"
      defaultValue={question}
      floatingLabelText="Frage"
    />
  </div>
);

EditFields.propTypes = propTypes;

const textFieldWrapperStyles = {
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: blueGrey900,
};

export default EditFields;
