import React from 'react';
import PropTypes from 'prop-types';

import interactionTypes, { typeNames } from '/imports/api/interactions/types';

import InteractionWrapper from '/imports/ui/components/InteractionWrapper';

import FullShowGame from './FullShowGame';
import FullShowWaiting from './FullShowWaiting';

import EstimationGame from './EstimationGame';
import EstimationVoting from './EstimationVoting';
import EstimationWaiting from './EstimationWaiting';
import EstimationEnded from './EstimationEnded';

import Announcement from './Announcement';

const interactionTypeNames = typeNames();

const interactionsMap = new Map([
  [interactionTypeNames.FULL_SHOW_GAME, FullShowGame],
  [interactionTypeNames.FULL_SHOW_WAITING, FullShowWaiting],

  [interactionTypeNames.ESTIMATION_GAME, EstimationGame],
  [interactionTypeNames.ESTIMATION_VOTING, EstimationVoting],
  [interactionTypeNames.ESTIMATION_WAITING, EstimationWaiting],
  [interactionTypeNames.ESTIMATION_ENDED, EstimationEnded],

  [interactionTypeNames.ANNOUNCEMENT, Announcement],
]);

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type
  hasSubmitted: PropTypes.bool.isRequired,
  submittedFor: PropTypes.string,
  submit: PropTypes.func.isRequired,
  candidate1: PropTypes.object.isRequired, // TODO: better type,
  candidate2: PropTypes.object.isRequired, // TODO: better type,
  scoreCandidate1: PropTypes.number.isRequired,
  scoreCandidate2: PropTypes.number.isRequired,
};

const Interactions = ({
  interaction,
  hasSubmitted,
  submittedFor,
  submit,
  candidate1,
  candidate2,
  scoreCandidate1,
  scoreCandidate2,
}) => {
  const { type } = interaction;
  const Component = interactionsMap.get(type);

  if (!Component) {
    return <div>TODO: Show graceful failure message here</div>; // TODO
  }

  const liveScoreProps = {
    mode: interaction.type === 'FULL_SHOW_GAME' && !hasSubmitted ? 'BIG' : 'SMALL',
    submittedFor,
    scoreCandidate1,
    scoreCandidate2,
    candidate1,
    candidate2,
  };

  const { schemaKey } = interactionTypes.get(type);
  return (
    <InteractionWrapper title={interaction.title} submit={submit} liveScoreProps={liveScoreProps}>
      <Component {...interaction[schemaKey]} hasSubmitted={hasSubmitted} submit={submit} />
    </InteractionWrapper>
  );
};

Interactions.propTypes = propTypes;

export default Interactions;
