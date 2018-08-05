import React from 'react';
import PropTypes from 'prop-types';

import interactionTypes, { typeNames } from '/imports/api/interactions/types';

import FullShowVoting from './FullShowVoting';
import FullShowWaiting from './FullShowWaiting';

import EstimationGame from './EstimationGame';
import EstimationVoting from './EstimationVoting';
import EstimationWaiting from './EstimationWaiting';
import EstimationEnded from './EstimationEnded';

import Announcement from './Announcement';

const interactionTypeNames = typeNames();

const interactionsMap = new Map([
  [interactionTypeNames.FULL_SHOW_VOTING, FullShowVoting],
  [interactionTypeNames.FULL_SHOW_WAITING, FullShowWaiting],

  [interactionTypeNames.ESTIMATION_GAME, EstimationGame],
  [interactionTypeNames.ESTIMATION_VOTING, EstimationVoting],
  [interactionTypeNames.ESTIMATION_WAITING, EstimationWaiting],
  [interactionTypeNames.ESTIMATION_ENDED, EstimationEnded],

  [interactionTypeNames.ANNOUNCEMENT, Announcement],
]);

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type
  submit: PropTypes.func.isRequired,
};

const Interactions = ({ interaction, submit }) => {
  const { type } = interaction;
  const Component = interactionsMap.get(type);

  if (!Component) {
    return <div>TODO: Show graceful failure message here</div>; // TODO
  }

  const { schemaKey } = interactionTypes.get(type);
  return <Component {...interaction[schemaKey]} submit={submit} />;
};

Interactions.propTypes = propTypes;

export default Interactions;
