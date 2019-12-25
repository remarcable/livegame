import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { JoinClient } from 'meteor-publish-join';

import AppState from '/imports/api/appState/collection';
import Candidates from '/imports/api/candidates/collection';
import InteractionsCollection from '/imports/api/interactions/collection';

import LiveViewLayout from '/imports/ui/Layouts/LiveViewLayout';
import DocumentTitle from '/imports/ui/components/DocumentTitle';
import ShowInteraction from './ShowInteraction';

import EstimationGameRanking from './ShowInteraction/EstimationGameRanking';
import FullShowGameRanking from './ShowInteraction/FullShowGameRanking';

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
  candidate1Name: PropTypes.string.isRequired,
  candidate2Name: PropTypes.string.isRequired,
};

const LiveView = ({ isReady, interaction, candidate1Name, candidate2Name }) => (
  <LiveViewLayout>
    <DocumentTitle>Liveview</DocumentTitle>
    {getInteraction({ isReady, interaction, candidate1Name, candidate2Name })}
  </LiveViewLayout>
);

const getInteraction = ({ isReady, interaction, candidate1Name, candidate2Name }) => {
  if (!isReady) {
    return <span>Loading</span>;
  }

  if (interaction._id === 'ESTIMATION_GAME_RANKING') {
    return <EstimationGameRanking />;
  }

  if (interaction._id === 'FULL_SHOW_GAME_RANKING') {
    return <FullShowGameRanking />;
  }

  return (
    <ShowInteraction
      interaction={interaction}
      candidate1Name={candidate1Name}
      candidate2Name={candidate2Name}
    />
  );
};

LiveView.propTypes = propTypes;

export default withTracker(() => {
  const appStateHandle = Meteor.subscribe('appState.admin');
  const candidatesHandle = Meteor.subscribe('candidates.active');
  const { interactionToShow = null } = AppState.findOne() || {};

  // because we have to additionally subscribe to
  // interactions.scoreboard, isReady will be false for a short time
  const interactionsHandle = Meteor.subscribe('interactions.scoreboard');
  const interaction = InteractionsCollection.findOne(interactionToShow) || {};

  const { name: candidate1Name = 'Kandidat' } = Candidates.findOne({ candidateNumber: 1 }) || {};
  const { name: candidate2Name = 'Paul' } = Candidates.findOne({ candidateNumber: 2 }) || {};

  const additionalData = {
    yesPercentage: 0,
    candidate1Percentage: 0,
    ...JoinClient.get('additionalData'),
  };

  const isReady =
    appStateHandle.ready() &&
    candidatesHandle.ready() &&
    !!interactionsHandle &&
    interactionsHandle.ready();

  return {
    interaction: { ...interaction, additionalData, _id: interactionToShow },
    isReady,
    candidate1Name,
    candidate2Name,
  };
})(LiveView);
