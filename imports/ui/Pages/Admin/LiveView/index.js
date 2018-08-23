import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import AppState from '/imports/api/appState/collection';
import InteractionsCollection from '/imports/api/interactions/collection';

import LiveViewLayout from '/imports/ui/Layouts/LiveViewLayout';
import Interactions from './Interactions';

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
};

const LiveView = ({ isReady, interaction }) => (
  <LiveViewLayout>
    {isReady ? <Interactions interaction={interaction} /> : <span>Loading</span>}
  </LiveViewLayout>
);

LiveView.propTypes = propTypes;

export default withTracker(() => {
  const appStateHandle = Meteor.subscribe('appState.admin');
  const { interactionToShow = null } = AppState.findOne() || {};

  const interactionsHandle = Meteor.subscribe('interactions.scoreboard', {
    interactionId: interactionToShow,
  });
  const interaction = InteractionsCollection.findOne(interactionToShow) || {};

  const isReady = appStateHandle.ready() && interactionsHandle.ready();

  return { interaction, isReady };
})(LiveView);
