import React from 'react';
import PropTypes from 'prop-types';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';

import ShowCard from './ShowCard';

import * as interactionStates from '../../../api/interactions/states';

const propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string,
  question: PropTypes.string.isRequired,
  startVoting: PropTypes.func.isRequired,
  stopVoting: PropTypes.func.isRequired,
  showVotingOnLiveView: PropTypes.func.isRequired,
  isOnLiveview: PropTypes.bool.isRequired,
};

const VotingCard = ({
  id,
  state,
  question,
  startVoting,
  stopVoting,
  showVotingOnLiveView,
  isOnLiveview,
}) => (
  <ShowCard
    id={id}
    state={state}
    question={question}
    startGame={startVoting}
    stopGame={stopVoting}
    showVotingOnLiveView={showVotingOnLiveView}
    isOnLiveview={isOnLiveview}
    isVoting
  >
    {state === interactionStates.CLOSED ? (
      <FloatingActionButton
        mini
        style={{ position: 'absolute', right: 0, transform: 'translateX(63%) scale(.75)' }}
        secondary={!isOnLiveview}
        onClick={() => showVotingOnLiveView(id)}
      >
        <LightBulbIcon style={{ fill: 'white' }} />
      </FloatingActionButton>
    ) : null}
  </ShowCard>
);

VotingCard.propTypes = propTypes;

export default VotingCard;
