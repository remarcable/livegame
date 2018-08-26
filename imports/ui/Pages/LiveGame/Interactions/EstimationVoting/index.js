import React from 'react';
import PropTypes from 'prop-types';

import Header from '/imports/ui/components/Header';

import EstimationWaiting from '../EstimationWaiting';

const propTypes = {
  question: PropTypes.string.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

const EstimationVoting = ({ question, hasSubmitted, submit }) => {
  if (hasSubmitted) {
    return <EstimationWaiting />;
  }

  return (
    <div>
      <Header title="Estimation Voting" />
      <p>Question: {question}</p>
      <button onClick={() => submit('YES')}>Ja</button>
      <button onClick={() => submit('NO')}>Nein</button>
    </div>
  );
};

EstimationVoting.propTypes = propTypes;

export default EstimationVoting;
