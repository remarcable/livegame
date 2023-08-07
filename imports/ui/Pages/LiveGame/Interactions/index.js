import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import ReactCSSTransitionReplace from 'react-css-transition-replace';

import interactionTypes, { interactionTypeNames } from '/imports/api/interactions/types';

import InteractionWrapper from '/imports/ui/components/InteractionWrapper';

import FullShowGame from './FullShowGame';
import FullShowWaiting from './FullShowWaiting';
import ParticipationVoting from './ParticipationVoting';

import EstimationGame from './EstimationGame';
import EstimationVoting from './EstimationVoting';
import EstimationWaiting from './EstimationWaiting';

import ShowBreak from './ShowBreak';

const interactionsMap = new Map([
  [interactionTypeNames.FULL_SHOW_GAME, FullShowGame],
  [interactionTypeNames.FULL_SHOW_WAITING, FullShowWaiting],
  [interactionTypeNames.PARTICIPATION_VOTING, ParticipationVoting],

  [interactionTypeNames.ESTIMATION_GAME, EstimationGame],
  [interactionTypeNames.ESTIMATION_VOTING, EstimationVoting],
  [interactionTypeNames.ESTIMATION_WAITING, EstimationWaiting],

  [interactionTypeNames.SHOW_BREAK, ShowBreak],
]);

const hasSubmittedMap = new Map([
  [interactionTypeNames.FULL_SHOW_GAME, FullShowWaiting],
  [interactionTypeNames.PARTICIPATION_VOTING, FullShowWaiting],
  [interactionTypeNames.ESTIMATION_GAME, EstimationWaiting],
  [interactionTypeNames.ESTIMATION_VOTING, EstimationWaiting],
]);

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  interaction: PropTypes.object.isRequired, // TODO: better type
  hasSubmitted: PropTypes.bool.isRequired,
  userIsSelectedAsParticipantForCurrentGame: PropTypes.bool.isRequired,
  submittedFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  submit: PropTypes.func.isRequired,
  candidate1: PropTypes.object.isRequired, // TODO: better type,
  candidate2: PropTypes.object.isRequired, // TODO: better type,
  scoreCandidate1: PropTypes.number.isRequired,
  scoreCandidate2: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired, // TODO: better type,
};

const Interactions = ({
  classes,
  interaction,
  hasSubmitted,
  userIsSelectedAsParticipantForCurrentGame,
  submittedFor,
  submit,
  candidate1,
  candidate2,
  scoreCandidate1,
  scoreCandidate2,
  user,
}) => {
  const { type } = interaction;
  let Component = interactionsMap.get(type);

  const shouldShowSubmitSuccessfulComponent = hasSubmitted && hasSubmittedMap.has(type);
  if (shouldShowSubmitSuccessfulComponent) {
    Component = hasSubmittedMap.get(type);
  }

  if (!Component) {
    return <div>Es ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu.</div>; // TODO Show graceful failure message here
  }

  const hasCandidates = !!candidate1.imageUrl && !!candidate2.imageUrl;
  const isFullShowGameAndNotSubmitted = interaction.type === 'FULL_SHOW_GAME' && !hasSubmitted;
  let mode = isFullShowGameAndNotSubmitted ? 'BIG' : 'SMALL';

  if (!hasCandidates) {
    mode = 'HIDE';
  }

  const liveScoreProps = {
    mode,
    hasSubmitted,
    submittedFor,
    scoreCandidate1,
    scoreCandidate2,
    candidate1,
    candidate2,
  };

  const isEstimationGame = [
    interactionTypeNames.ESTIMATION_GAME,
    interactionTypeNames.ESTIMATION_VOTING,
    interactionTypeNames.ESTIMATION_WAITING,
  ].includes(type);

  const { schemaKey } = interactionTypes.get(type);
  return (
    <InteractionWrapper
      title={interaction.title}
      submit={submit}
      liveScoreProps={liveScoreProps}
      isEstimationGame={isEstimationGame}
      userIsSelectedAsParticipantForCurrentGame={userIsSelectedAsParticipantForCurrentGame}
    >
      <ReactCSSTransitionReplace
        transitionName="fade-wait"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={200}
      >
        <div className={classes.componentWrapper} key={`${interaction._id}-submit-${hasSubmitted}`}>
          <Component
            {...interaction[schemaKey]}
            submit={submit}
            userIsSelectedAsParticipantForCurrentGame={userIsSelectedAsParticipantForCurrentGame}
            hasSubmitted={hasSubmitted}
            user={user}
          />
        </div>
      </ReactCSSTransitionReplace>
    </InteractionWrapper>
  );
};

Interactions.propTypes = propTypes;

const styles = {
  componentWrapper: {},
};

export default withStyles(styles)(Interactions);
