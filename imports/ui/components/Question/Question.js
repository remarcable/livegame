import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number,
};

// Convert the questionNumber to a string allow leftpad
const questionNumberString = questionNumber => `${questionNumber}`.padStart(2, '0');

const Question = ({
  question,
  questionNumber,
}) => (
  <p style={{ fontWeight: 200 }}>
    {
      questionNumber
      && <span style={questionNumberStyles}>{questionNumberString(questionNumber)}. Frage</span>
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
