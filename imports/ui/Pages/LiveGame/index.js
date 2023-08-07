import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import { JoinClient } from 'meteor-publish-join';

import InteractionsCollection from '/imports/api/interactions/collection';
import SubmissionsCollection from '/imports/api/submissions/collection';
import CandidatesCollection from '/imports/api/candidates/collection';

import { submit } from '/imports/api/submissions/methods';
import { interactionTypeNames } from '/imports/api/interactions/types';
import * as interactionStates from '/imports/api/interactions/states';
import sortFullShowGames from '/imports/api/helpers/sortFullShowGames';
import getStateForGameAndSubmission from '/imports/api/helpers/getStateForGameAndSubmission';

import { withStyles } from '@material-ui/styles';

import PlayerLayout from '/imports/ui/Layouts/PlayerLayout';
import ScoreSidebar from '/imports/ui/components/ScoreSidebar';
import Interactions from './Interactions';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  interaction: PropTypes.object.isRequired, // TODO: better type
  games: PropTypes.array.isRequired, // TODO: better type
  loading: PropTypes.bool.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  userIsSelectedAsParticipantForCurrentGame: PropTypes.bool.isRequired,
  submittedFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  candidate1: PropTypes.object.isRequired, // TODO: better type
  candidate2: PropTypes.object.isRequired, // TODO: better type
  scoreCandidate1: PropTypes.number.isRequired,
  scoreCandidate2: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired, // TODO: better type
  isAdminPreview: PropTypes.bool,
};

const LiveGame = ({
  classes,
  loading,
  interaction,
  games,
  hasSubmitted,
  userIsSelectedAsParticipantForCurrentGame,
  submittedFor,
  candidate1,
  candidate2,
  scoreCandidate1,
  scoreCandidate2,
  user,
  isAdminPreview = false,
}) => (
  <PlayerLayout loading={loading}>
    <div className={classes.wrapper}>
      <ScoreSidebar games={games} isAdminPreview={isAdminPreview} />
      <div className={classes.interactionsWrapper}>
        <Interactions
          interaction={interaction}
          submit={submitValue}
          hasSubmitted={hasSubmitted}
          userIsSelectedAsParticipantForCurrentGame={userIsSelectedAsParticipantForCurrentGame}
          submittedFor={submittedFor}
          candidate1={candidate1}
          candidate2={candidate2}
          scoreCandidate1={scoreCandidate1}
          scoreCandidate2={scoreCandidate2}
          user={user}
        />
      </div>
    </div>
  </PlayerLayout>
);

LiveGame.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
  },
  interactionsWrapper: {
    width: 'calc(100% - 50px)', // -50px for ScoreSidebar
    marginLeft: 50,
    maxWidth: 'calc(100% - 50px)',
    height: '100%',
  },
};

// save old interaction to always show the last "ACTIVE" interaction
// this prevents paint flashing a loading message
let lastInteraction = {};

// optimistically update the UI when the user made a choice
const isSubmitting = new ReactiveVar(false);

const submitValue = (value) => {
  isSubmitting.set(true);
  submit.call({ value }, (err) => {
    if (err) {
      console.error('Error submitting value', err);
    }

    isSubmitting.set(false);
  });
};

export default withTracker(() => {
  const ownInteractionsHandle = Meteor.subscribe('interactions.active');
  const ownSubmissionsHandle = Meteor.subscribe('submissions.own');
  const candidatesHandle = Meteor.subscribe('candidates.active');

  const isReady =
    ownInteractionsHandle.ready() && ownSubmissionsHandle.ready() && candidatesHandle.ready();

  const interaction = InteractionsCollection.findOne({ state: interactionStates.ACTIVE });
  if (interaction && interaction._id !== lastInteraction._id) {
    lastInteraction = interaction;
    // reset isSubmitting state for every new interaction
    isSubmitting.set(false);
  }

  const participationVotings =
    InteractionsCollection.find({
      type: interactionTypeNames.PARTICIPATION_VOTING,
    }).fetch() || [];

  const interactionTitle = interaction?.title;
  const participationVotingForInteraction = participationVotings.find(
    (el) => el.title === interactionTitle,
  );

  const selectedParticipantIdForCurrentGame =
    participationVotingForInteraction?.participationVoting?.selectedParticipant;
  const selectedParticipantIsConfirmed =
    participationVotingForInteraction?.participationVoting?.selectionState === 'CONFIRMED';
  const userIsSelectedAsParticipantForCurrentGame =
    selectedParticipantIdForCurrentGame === Meteor.userId() && selectedParticipantIsConfirmed;

  const { value: submissionValueForCurrentInteraction } =
    SubmissionsCollection.findOne({
      interactionId: lastInteraction && lastInteraction._id,
    }) || {};

  const submissions = SubmissionsCollection.find().fetch();
  const games = InteractionsCollection.find({ type: interactionTypeNames.FULL_SHOW_GAME })
    .fetch()
    .sort(sortFullShowGames)
    .map((game) => {
      const {
        state: currentState,
        fullShowGame: { winner },
      } = game;

      const submission = submissions.find((el) => el.interactionId === game._id);
      const state = getStateForGameAndSubmission({ submission, winner, currentState });

      return { ...game, state };
    });

  const candidates = CandidatesCollection.find()
    .fetch()
    .map(({ candidateNumber, name, imageUrl }) => ({ number: candidateNumber, name, imageUrl }));

  const candidate1 = candidates.find(({ number }) => number === 1) || {};
  const candidate2 = candidates.find(({ number }) => number === 2) || {};

  const { candidate1: scoreCandidate1 = 0, candidate2: scoreCandidate2 = 0 } =
    JoinClient.get('candidateScores') || {};

  const user = Meteor.users.findOne() || {};

  return {
    user,
    interaction: lastInteraction,
    games: isReady ? games : [],
    hasSubmitted: !!submissionValueForCurrentInteraction || isSubmitting.get(),
    userIsSelectedAsParticipantForCurrentGame,
    submittedFor: submissionValueForCurrentInteraction,
    loading: !isReady,
    candidate1,
    candidate2,
    scoreCandidate1,
    scoreCandidate2,
  };
})(withStyles(styles)(LiveGame));
