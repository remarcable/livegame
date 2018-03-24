import React from 'react';
import PropTypes from 'prop-types';

import ShowCard from './ShowCard';

const propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string,
  question: PropTypes.string.isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const GameCard = ({
  id, state, question, startGame, stopGame, isDisabled,
}) => (
  <ShowCard
    isVoting={false}
    id={id}
    state={state}
    question={question}
    startGame={startGame}
    isDisabled={isDisabled}
    stopGame={stopGame}
  />
);

GameCard.propTypes = propTypes;

export default GameCard;
