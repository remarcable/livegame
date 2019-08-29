import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { JoinClient } from 'meteor-publish-join';

import classnames from 'classnames';

import KeyHandler from 'react-key-handler';

import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import blue from '@material-ui/core/colors/blue';

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
import getTextForInteraction from '/imports/api/helpers/getTextForInteraction';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';
import UpdateGames from './UpdateGames';

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

const typeToIcon = {
  SHOW_BREAK: <RestaurantIcon />,
  ESTIMATION_GAME: <DonutSmallIcon />,
  ESTIMATION_VOTING: <EqualizerIcon />,
  ESTIMATION_WAITING: <HourglassEmptyIcon />,
  FULL_SHOW_GAME: <DonutSmallIcon />,
  FULL_SHOW_WAITING: <HourglassEmptyIcon />,
};

window.onkeydown = (e) => !(e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ');

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
  <AdminLayout>
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
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">Typ</TableCell>
              <TableCell>Nr, Titel, Frage</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {isReady &&
              interactions.map((i) => (
                <TableRow
                  key={i._id}
                  selected={i.state === 'ACTIVE'}
                  classes={{
                    root: classnames(classes.tableRowRoot, {
                      [classes.estimationGame]: i.type.startsWith('ESTIMATION'),
                    }),
                    selected: classes.selected,
                  }}
                >
                  <TableCell padding="default">{typeToIcon[i.type]}</TableCell>
                  <TableCell>{getTextForInteraction(i)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => startInteraction.call({ interactionId: i._id })}
                      disabled={i.state === 'ACTIVE'}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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

      <div className={classes.navigation}>
        <IconButton onClick={() => previousInteraction.call()} disabled={!hasPrevious}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={() => nextInteraction.call()} disabled={!hasNext}>
          <NavigateNextIcon />
        </IconButton>
      </div>
    </div>
  </AdminLayout>
);

const styles = {
  wrapper: {
    paddingTop: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  selected: {
    backgroundColor: [blue.A400, '!important'],
  },
  tableRowRoot: {
    transition: `background-color 200ms`, // TODO: use theme.transitions.duration.shorter
    '&$estimationGame': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  estimationGame: {},
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
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
  },
};

ShowScreen.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const candidatesHandle = Meteor.subscribe('candidates.active');
  const isReady = interactionsHandle.ready() && candidatesHandle.ready();

  const interactions = Interactions.find().fetch();
  const games = interactions
    .filter((i) => i.type === interactionTypeNames.FULL_SHOW_GAME)
    .sort(sortFullShowGames);

  const { name: candidate1Name } = Candidates.findOne({ candidateNumber: 1 }) || {};
  const { name: candidate2Name } = Candidates.findOne({ candidateNumber: 2 }) || {};

  const currentInteraction = interactions.find(({ state }) => state === 'ACTIVE') || {}; // TODO: use interactionStates
  const hasNext = !!currentInteraction.next;
  const hasPrevious = !!currentInteraction.previous;

  const { candidate1: scoreCandidate1 = 0, candidate2: scoreCandidate2 = 0 } =
    JoinClient.get('candidateScores') || {};

  const scoreText = `${scoreCandidate1} : ${scoreCandidate2}`;

  let sortedInteractions = [];

  try {
    sortedInteractions = mapSort(interactions);
  } catch (e) {
    console.log(`Fehler beim Sortieren!`, e.message);
  }
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
