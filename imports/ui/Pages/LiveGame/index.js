import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import InteractionsCollection from '/imports/api/interactions/collection';
import submit from '/imports/api/submissions/methods';

import PlayerLayout from '/imports/ui/Layouts/PlayerLayout';
import Interactions from './Interactions';

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type
  loading: PropTypes.bool.isRequired,
};

const LiveGame = ({ loading, interaction }) => (
  <PlayerLayout loading={loading}>
    <Interactions interaction={interaction} submit={(value) => submit.call({ value })} />
  </PlayerLayout>
);

LiveGame.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.active');
  const loading = !interactionsHandle.ready();

  const interaction = InteractionsCollection.findOne() || {};
  return { interaction, loading };
})(LiveGame);
