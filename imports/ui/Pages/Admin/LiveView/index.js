import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { JoinClient } from 'meteor-publish-join';

import AppState from '/imports/api/appState/collection';
import InteractionsCollection from '/imports/api/interactions/collection';

import LiveViewLayout from '/imports/ui/Layouts/LiveViewLayout';
import ShowInteraction from './ShowInteraction';

import EstimationGameRanking from './ShowInteraction/EstimationGameRanking';

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
};

const LiveView = ({ isReady, interaction }) => (
  <LiveViewLayout>
    {isReady ? <ShowInteraction interaction={interaction} /> : <span>Loading</span>}
  </LiveViewLayout>
);

LiveView.propTypes = propTypes;

export default withTracker(() => {
  const appStateHandle = Meteor.subscribe('appState.admin');
  const { interactionToShow: interactionId = null } = AppState.findOne() || {};

  // because we have to additionally subscribe to
  // interactions.scoreboard, isReady will be false for a short time
  const interactionsHandle = Meteor.subscribe('interactions.scoreboard');
  const interaction = InteractionsCollection.findOne(interactionId) || {};

  const additionalData = {
    yesPercentage: 0,
    candidate1Percentage: 0,
    ...JoinClient.get('additionalData'),
  };

  const isReady = appStateHandle.ready() && (!!interactionsHandle && interactionsHandle.ready());
  return { interaction: { ...interaction, additionalData }, isReady };
})(LiveView);
