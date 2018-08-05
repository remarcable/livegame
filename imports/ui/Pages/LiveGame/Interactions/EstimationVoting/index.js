import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  question: PropTypes.string.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

const EstimationVoting = ({ question, hasSubmitted, submit }) => (
  <div>
    <h1>EstimationVoting</h1>
    <p>Question: {question}</p>
    {hasSubmitted && <p>submitted</p>}

    <button onClick={() => submit('YES')}>Ja</button>
    <button onClick={() => submit('NO')}>Nein</button>
  </div>
);

EstimationVoting.propTypes = propTypes;

export default EstimationVoting;
