import React from 'react';
import PropTypes from 'prop-types';

import GameCard from '../GameCard';
import VotingCard from '../GameCard/VotingCard';

import * as interactionTypes from '/imports/api/interactions/types';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO
  startInteraction: PropTypes.func.isRequired,
  stopInteraction: PropTypes.func.isRequired,
  showVotingOnLiveView: PropTypes.func.isRequired,
  currentlyShownOnLiveView: PropTypes.string,
};

const InteractionsList = ({
  interactions,
  startInteraction,
  stopInteraction,
  showVotingOnLiveView,
  currentlyShownOnLiveView,
}) => (
  <div style={{ width: '100%' }}>
    {interactions.map((interaction) => {
      const { _id, type } = interaction;

      if (type === interactionTypes.ESTIMATION_GAME) {
        return renderGame(interaction, startInteraction, stopInteraction);
      }

      if (type === interactionTypes.ESTIMATION_VOTING) {
        return renderVoting(
          { ...interaction, isOnLiveview: _id === currentlyShownOnLiveView },
          startInteraction,
          stopInteraction,
          showVotingOnLiveView,
        );
      }
    })}
  </div>
);

function renderGame({ _id, state, estimationGame: { question } }, startInteraction, stopInteraction) {
  return (
    <div key={_id}>
      <GameCard
        id={_id}
        state={state}
        isDisabled={false}
        question={question}
        startGame={startInteraction}
        stopGame={stopInteraction}
      />
    </div>
  );
}

function renderVoting(
  { _id, state, estimationVoting: { question }, isOnLiveview },
  startInteraction,
  stopInteraction,
  showVotingOnLiveView,
) {
  return (
    <div key={_id}>
      <VotingCard
        id={_id}
        state={state}
        isDisabled={false}
        question={question}
        startVoting={startInteraction}
        stopVoting={stopInteraction}
        showVotingOnLiveView={showVotingOnLiveView}
        isOnLiveview={isOnLiveview}
      />
    </div>
  );
}

InteractionsList.propTypes = propTypes;

export default InteractionsList;
