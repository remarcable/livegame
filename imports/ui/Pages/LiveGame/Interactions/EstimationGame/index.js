import React from 'react';
import PropTypes from 'prop-types';

import EstimationWaiting from '../EstimationWaiting';

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

const EstimationGame = ({ question, hasSubmitted, submit }) => {
  if (hasSubmitted) {
    return <EstimationWaiting />;
  }

  return (
    <div>
      <h1>EstimationGame</h1>
      <p>Question: {question}</p>
      <form onSubmit={(e) => handleSubmit(e, submit)}>
        <input type="number" name="answer" required />
        <input type="submit" />
      </form>
    </div>
  );
};
EstimationGame.propTypes = propTypes;

export default EstimationGame;
