import React from 'react';
import PropTypes from 'prop-types';

import interactionTypes, { typeNames } from '/imports/api/interactions/types';

import FullShowGame from './FullShowGame';
import EstimationGame from './EstimationGame';
import EstimationVoting from './EstimationVoting';

const interactionTypeNames = typeNames();

const interactionsMap = new Map([
  [interactionTypeNames.FULL_SHOW_GAME, FullShowGame],
  [interactionTypeNames.ESTIMATION_GAME, EstimationGame],
  [interactionTypeNames.ESTIMATION_VOTING, EstimationVoting],
]);

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type
};

// TODO we have almost the same component for LiveGame => should be split out to helper component
const Interactions = ({ interaction }) => {
  const { type } = interaction;
  const Component = interactionsMap.get(type);

  if (!Component) {
    return <div>TODO: Show graceful failure message here</div>; // TODO
  }

  const { schemaKey } = interactionTypes.get(type);
  return <Component {...interaction[schemaKey]} />;
};

Interactions.propTypes = propTypes;

export default Interactions;
