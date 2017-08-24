import React from 'react';
import PropTypes from 'prop-types';

import ShowCard from './ShowCard';

const propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string,
  question: PropTypes.string.isRequired,
  startVoting: PropTypes.func.isRequired,
  stopVoting: PropTypes.func.isRequired,
};

const VotingCard = ({ id, state, question, startVoting, stopVoting }) => (
  <ShowCard
    isVoting
    id={id}
    state={state}
    question={question}
    startGame={startVoting}
    stopGame={stopVoting}
  />
);

VotingCard.propTypes = propTypes;

export default VotingCard;
