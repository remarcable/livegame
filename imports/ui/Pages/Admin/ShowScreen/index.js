import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import KeyHandler from 'react-key-handler';

import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import Candidates from '/imports/api/candidates/collection';

import Interactions from '/imports/api/interactions/collection';
import {
  startInteraction,
  previousInteraction,
  updateInteractionDetails,
  nextInteraction,
} from '/imports/api/interactions/methods';

import { interactionTypeNames } from '/imports/api/interactions/types';
import { mapSort } from '/imports/api/helpers/mapSort';
import sortFullShowGames from '/imports/api/helpers/sortFullShowGames';

import DocumentTitle from '/imports/ui/components/DocumentTitle';

import UpdateGames from './UpdateGames';
import InteractionLauncher from './InteractionLauncher';
import ShowScreenPreview from './ShowScreenPreview';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  interactions: PropTypes.array.isRequired, // TODO: better type!
  games: PropTypes.array.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  candidate1Name: PropTypes.string,
  candidate2Name: PropTypes.string,
  scoreText: PropTypes.string,
};

window.onkeydown = (e) =>
  !(
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown' ||
    (e.key === ' ' && window.location.pathname === '/admin/show')
  );

const ShowScreen = ({
  classes,
  isReady,
  interactions,
  games,
  hasNext,
  hasPrevious,
  candidate1Name,
  candidate2Name,
  scoreText,
}) => (
  <>
    <DocumentTitle>App-Steuerung</DocumentTitle>

    <KeyHandler keyValue="ArrowUp" onKeyHandle={() => hasPrevious && previousInteraction.call()} />
    <KeyHandler
      keyValue="ArrowLeft"
      onKeyHandle={() => hasPrevious && previousInteraction.call()}
    />
    <KeyHandler keyValue="ArrowRight" onKeyHandle={() => hasNext && nextInteraction.call()} />
    <KeyHandler keyValue="ArrowDown" onKeyHandle={() => hasNext && nextInteraction.call()} />
    <KeyHandler keyValue=" " onKeyHandle={() => hasNext && nextInteraction.call()} />

    <div className={classes.wrapper}>
      <Paper className={classes.interactions}>
        <InteractionLauncher
          isReady={isReady}
          interactions={interactions}
          startInteraction={startInteraction}
        />
      </Paper>

      <Paper className={classes.games}>
        <UpdateGames
          games={games}
          updateScores={({ _id: id, pointsCandidate1, pointsCandidate2 }) =>
            updateInteractionDetails.call({ id, data: { pointsCandidate1, pointsCandidate2 } })
          }
          setWinner={({ _id: id, winner }) =>
            updateInteractionDetails.call({ id, data: { winner } })
          }
          candidate1Name={candidate1Name}
          candidate2Name={candidate2Name}
          scoreText={scoreText}
        />
      </Paper>

      <ShowScreenPreview />

      <div className={classes.navigation}>
        <IconButton onClick={() => previousInteraction.call()} disabled={!hasPrevious}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={() => nextInteraction.call()} disabled={!hasNext}>
          <NavigateNextIcon />
        </IconButton>
      </div>
    </div>
  </>
);

const styles = {
  wrapper: {
    width: 'calc(100% - 64px)',
    padding: 32,
    display: 'flex',
    justifyContent: 'center',
    gap: 32,
  },
  interactions: {
    maxWidth: '80%',
    maxHeight: '85vh',
    overflow: 'scroll',
  },
  games: {
    maxWidth: '35%',
    maxHeight: '85vh',
    overflow: 'scroll',
  },
  navigation: {
    position: 'absolute',
    bottom: 20,
    width: 200,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    borderRadius: 4,
  },
};

ShowScreen.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const candidatesHandle = Meteor.subscribe('candidates.active');
  const isReady = interactionsHandle.ready() && candidatesHandle.ready();

  const interactions = Interactions.find().fetch();

  let sortedInteractions = [];

  try {
    sortedInteractions = mapSort(interactions);
  } catch (e) {
    console.log(`Fehler beim Sortieren!`, e.message);
  }

  const games = interactions
    .filter((i) => i.type === interactionTypeNames.FULL_SHOW_GAME)
    .sort(sortFullShowGames);

  const { name: candidate1Name } = Candidates.findOne({ candidateNumber: 1 }) || {};
  const { name: candidate2Name } = Candidates.findOne({ candidateNumber: 2 }) || {};

  const currentInteraction = interactions.find(({ state }) => state === 'ACTIVE') || {}; // TODO: use interactionStates
  const hasNext = !!currentInteraction.next;
  const hasPrevious = !!currentInteraction.previous;

  const getScores = (winner, allGames) =>
    allGames
      .filter((game) => game.fullShowGame.winner === winner)
      .map((game) => game.fullShowGame.pointsCandidate1 + game.fullShowGame.pointsCandidate2)
      .reduce((acc, curr) => acc + curr, 0);

  const scoreCandidate1 = getScores('CANDIDATE1', games);
  const scoreCandidate2 = getScores('CANDIDATE2', games);

  const scoreText = `${scoreCandidate1} : ${scoreCandidate2}`;

  return {
    interactions: sortedInteractions,
    games,
    hasNext,
    hasPrevious,
    isReady,
    candidate1Name,
    candidate2Name,
    scoreText,
  };
})(withStyles(styles)(ShowScreen));
