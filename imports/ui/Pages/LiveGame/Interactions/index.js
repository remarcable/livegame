import React from 'react';
import PropTypes from 'prop-types';

import { typeNames } from '/imports/api/interactions/types';

import FullShowVoting from './FullShowVoting';
import FullShowWaiting from './FullShowWaiting';

import EstimationGame from './EstimationGame';
import EstimationVoting from './EstimationVoting';
import EstimationWaiting from './EstimationWaiting';
import EstimationEnded from './EstimationEnded';

import Announcement from './Announcement';

const interactionTypes = typeNames();
const interactionsMap = new Map([
  [interactionTypes.FULL_SHOW_VOTING, FullShowVoting],
  [interactionTypes.FULL_SHOW_WAITING, FullShowWaiting],

  [interactionTypes.ESTIMATION_GAME, EstimationGame],
  [interactionTypes.ESTIMATION_VOTING, EstimationVoting],
  [interactionTypes.ESTIMATION_WAITING, EstimationWaiting],
  [interactionTypes.ESTIMATION_ENDED, EstimationEnded],

  [interactionTypes.ANNOUNCEMENT, Announcement],
]);

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type
  submit: PropTypes.func.isRequired,
};

const Interactions = ({ interaction, submit }) => {
  const { type } = interaction;
  const Component = interactionsMap.get(type);

  if (!Component) {
    return <div>TODO: Show graceful failure message here</div>;
  }

  return <Component interaction={interaction} submit={submit} />;
};

Interactions.propTypes = propTypes;

export default Interactions;
