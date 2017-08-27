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
  showVotingOnLiveView: PropTypes.func.isRequired,
  currentlyShownOnLiveView: PropTypes.string,
};

const GamesList = ({ games, startGame, stopGame, startVoting, stopVoting, showVotingOnLiveView, currentlyShownOnLiveView }) => (
  <div style={{ width: '100%' }}>
    {
      games.map(({ voting, votingId, question, _id, state }) => (
        <div key={_id}>
          {
            votingId &&
            <VotingCard
              id={voting._id}
              state={voting.state}
              question={voting.question}
              startVoting={startVoting}
              stopVoting={stopVoting}
              isOnLiveview={voting._id === currentlyShownOnLiveView}
              showVotingOnLiveView={showVotingOnLiveView}
            />
          }
          <GameCard
            id={_id}
            state={state}
            isDisabled={!!voting && voting.state !== 'closed'}
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
