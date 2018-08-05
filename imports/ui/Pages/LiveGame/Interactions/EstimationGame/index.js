import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  question: PropTypes.string.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

const handleSubmit = (e, submit) => {
  e.preventDefault();
  const answer = e.target.answer.value;
  submit(answer);
};

const EstimationGame = ({ question, hasSubmitted, submit }) => (
  <div>
    <h1>EstimationGame</h1>
    <p>Question: {question}</p>
    {hasSubmitted && <p>submitted</p>}

    <form onSubmit={(e) => handleSubmit(e, submit)}>
      <input type="number" name="answer" required />
      <input type="submit" />
    </form>
  </div>
);

EstimationGame.propTypes = propTypes;

export default EstimationGame;
