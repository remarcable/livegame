import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import InteractionsCollection from '/imports/api/interactions/collection';

import PlayerLayout from '/imports/ui/Layouts/PlayerLayout';
import Interactions from './Interactions';
import Loading from '/imports/ui/Pages/Loading';

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type
  isReady: PropTypes.bool.isRequired,
};

const LiveGame = ({ isReady, interaction }) => (
  <PlayerLayout>{isReady ? <Interactions interaction={interaction} /> : <Loading />}</PlayerLayout>
);

LiveGame.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.active');
  const isReady = interactionsHandle.ready();

  const interaction = InteractionsCollection.findOne() || {};
  return { interaction, isReady };
})(LiveGame);
