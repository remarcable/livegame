import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import InteractionsCollection from '/imports/api/interactions/collection';
import SubmissionsCollection from '/imports/api/submissions/collection';
import { submit } from '/imports/api/submissions/methods';
import { typeNames } from '/imports/api/interactions/types';
import * as interactionStates from '/imports/api/interactions/states';
import sortFullShowGames from '/imports/api/helpers/sortFullShowGames';
import getStateForGameAndSubmission from '/imports/api/helpers/getStateForGameAndSubmission';

import { withStyles } from '@material-ui/core/styles';

import PlayerLayout from '/imports/ui/Layouts/PlayerLayout';
import ProgressSidebar from '/imports/ui/components/ProgressSidebar';
import Interactions from './Interactions';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  interaction: PropTypes.object.isRequired, // TODO: better type
  games: PropTypes.array.isRequired, // TODO: better type
  loading: PropTypes.bool.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
};

const LiveGame = ({ classes, loading, interaction, games, hasSubmitted }) => (
  <PlayerLayout loading={loading}>
    <div className={classes.wrapper}>
      <ProgressSidebar games={games} />
      <div className={classes.interactionsWrapper}>
        <Interactions
          interaction={interaction}
          submit={(value) => submit.call({ value })}
          hasSubmitted={hasSubmitted}
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
    display: 'flex',
  },
  interactionsWrapper: {
    width: 'calc(100% - 50px)', // -50px for ProgressSidebar
    height: '100%',
    maxWidth: 'calc(100% - 50px)',
    maxHeight: '100%',
  },
};

const interactionTypeNames = typeNames();

// save old interaction to always show the last "ACTIVE" interaction
// this prevents paint flashing a loading message
let lastInteraction = {};
export default withTracker(() => {
  const ownInteractionsHandle = Meteor.subscribe('interactions.active');
  const ownSubmissionsHandle = Meteor.subscribe('submissions.own');
  const isReady = ownInteractionsHandle.ready() && ownSubmissionsHandle.ready();

  const interaction = InteractionsCollection.findOne({ state: interactionStates.ACTIVE });
  if (interaction) {
    lastInteraction = interaction;
  }

  const submissionForCurrentInteraction = SubmissionsCollection.findOne({
    interactionId: lastInteraction && lastInteraction._id,
  });

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

  return {
    interaction: lastInteraction,
    games: isReady ? games : [],
    hasSubmitted: !!submissionForCurrentInteraction,
    loading: !isReady,
  };
})(withStyles(styles)(LiveGame));
