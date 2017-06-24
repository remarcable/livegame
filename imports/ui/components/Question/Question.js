import React from 'react';
import PropTypes from 'prop-types';

import padLeft from '../../../api/helpers/padLeft';

const propTypes = {
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number,
};

const Question = ({
  question,
  questionNumber,
}) => (
  <p style={{ fontWeight: 200 }}>
    {
      questionNumber
      && <span style={questionNumberStyles}>{padLeft(questionNumber)}. Frage</span>
    }
    {question}
  </p>
);

Question.propTypes = propTypes;

const questionNumberStyles = {
  paddingRight: '.75em',
  fontSize: '.8em',
  fontWeight: 700,
  textTransform: 'uppercase',
};

export default Question;
