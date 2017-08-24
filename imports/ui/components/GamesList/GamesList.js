import React from 'react';
import PropTypes from 'prop-types';

import GameCard from '../GameCard';
import VotingCard from '../GameCard/VotingCard';

const propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      votingId: PropTypes.string,
      voting: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        state: PropTypes.string,
      }),
      question: PropTypes.string.isRequired,
      state: PropTypes.string,
    }),
  ).isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
  startVoting: PropTypes.func.isRequired,
  stopVoting: PropTypes.func.isRequired,
};

const GamesList = ({ games, startGame, stopGame, startVoting, stopVoting }) => (
  <div style={{ minWidth: '50%' }}>
    {
      games.map(({ voting, votingId, question, _id, state }) => (
        <div key={_id} style={{ position: 'relative' }}>
          {
            votingId &&
            <VotingCard
              id={voting._id}
              state={voting.state}
              question={voting.question}
              startVoting={startVoting}
              stopVoting={stopVoting}
            />
          }
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
