import React from 'react';
import PropTypes from 'prop-types';

import GameCard from '../GameCard';

const propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      state: PropTypes.string,
    }),
  ).isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
};

const GamesList = ({ games, startGame, stopGame }) => (
  <div>
    {
      games.map(({ question, _id, state }) => (
        <div key={_id}>
          <GameCard
            id={_id}
            state={state}
            question={question}
            startGame={startGame}
            stopGame={stopGame}
          />
        </div>
      ))
    }
  </div>
);

GamesList.propTypes = propTypes;


export default GamesList;
