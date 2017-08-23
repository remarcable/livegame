import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import { blueGrey900 } from 'material-ui/styles/colors';

const propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.number.isRequired,
};

const EditFields = ({ question, answer }) => (
  <div style={textFieldWrapperStyles}>
    <TextField
      autoFocus
      fullWidth
      name="question"
      defaultValue={question}
      floatingLabelText="Frage"
    />
    <TextField
      fullWidth
      name="answer"
      type="number"
      defaultValue={answer}
      floatingLabelText="Antwort"
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
