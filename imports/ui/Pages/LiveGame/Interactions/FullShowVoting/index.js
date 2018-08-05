import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  question: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

const FullShowVoting = ({ question, submit }) => (
  <div>
    <h1>FullShowVoting</h1>
    <p>Question: {question}</p>

    <button onClick={() => submit('PAUL')}>PAUL</button>
    <button onClick={() => submit('CANDIDATE')}>KANDIDAT</button>
  </div>
);

FullShowVoting.propTypes = propTypes;

export default FullShowVoting;
