import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  question: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

const EstimationVoting = ({ question, submit }) => (
  <div>
    <p>Question: {question}</p>
    <button onClick={() => submit('YES')}>Ja</button>
    <button onClick={() => submit('NO')}>Nein</button>
  </div>
);

EstimationVoting.propTypes = propTypes;

export default EstimationVoting;
