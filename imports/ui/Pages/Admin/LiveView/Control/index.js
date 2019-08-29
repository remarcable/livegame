import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import classnames from 'classnames';

import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Button from '@material-ui/core/Button';

import blue from '@material-ui/core/colors/blue';

import AppState from '/imports/api/appState/collection';
import Candidates from '/imports/api/candidates/collection';

import { setCandidate, unsetCandidate } from '/imports/api/candidates/methods';

import Interactions from '/imports/api/interactions/collection';
import { interactionTypeNames } from '/imports/api/interactions/types';
import * as interactionStates from '/imports/api/interactions/states';
import { setClosedState, unsetClosedState } from '/imports/api/interactions/methods';
import getTextForInteraction from '/imports/api/helpers/getTextForInteraction';

import { showRanksUpTo, displayInteraction } from '/imports/api/appState/methods';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';
import LiveView from '../';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeInteraction: PropTypes.string.isRequired,
  rankDisplayMode: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired, // TODO: Better proptype
  candidates: PropTypes.array.isRequired, // TODO: Better proptype
  interactions: PropTypes.array.isRequired, // TODO: Better proptype
};

const LiveViewControl = ({
  classes,
  games,
  interactions,
  candidates,
  activeInteraction,
  rankDisplayMode,
}) => (
  <AdminLayout>
    <div className={classes.wrapper}>
      <Paper className={classes.interactions}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Start</TableCell>
              <TableCell>Titel</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {true &&
              games.map((i) => (
                <TableRow
                  key={i._id}
                  selected={i._id === activeInteraction}
                  classes={{
                    root: classnames(classes.tableRowRoot, {
                      [classes.estimationGame]: i.type.startsWith('ESTIMATION'),
                    }),
                    selected: classes.selected,
                  }}
                >
                  <TableCell>
                    <IconButton
                      onClick={() => displayInteraction.call({ interactionId: i._id })}
                      disabled={i.state !== 'CLOSED'}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {i.estimationVoting && i.estimationVoting.question}
                    {i.fullShowGame && `${i.fullShowGame.gameNumber}. ${i.title}`}
                  </TableCell>
                  <TableCell>
                    {i.state === 'CLOSED' && (
                      <IconButton onClick={() => unsetClosedState.call({ interactionId: i._id })}>
                        <StarIcon />
                      </IconButton>
                    )}
                    {i.state === null && (
                      <IconButton onClick={() => setClosedState.call({ interactionId: i._id })}>
                        <StarBorderIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
      <div className={classes.leftColumn}>
        <Paper className={classes.liveViewWrapper}>
          <div className={classes.liveView}>
            <LiveView />
          </div>
        </Paper>
        <Paper
          className={classnames(classes.actionWrapper, {
            [classes.activePaper]: activeInteraction === 'FULL_SHOW_GAME_RANKING',
          })}
        >
          <Button
            onClick={() => displayInteraction.call({ interactionId: 'FULL_SHOW_GAME_RANKING' })}
          >
            Full Show Ranking
          </Button>
        </Paper>
        <Paper
          className={classnames(classes.actionWrapper, {
            [classes.activePaper]: activeInteraction === 'ESTIMATION_GAME_RANKING',
          })}
        >
          <div className={classnames(classes.estimationGameHalf, classes.buttonGroup)}>
            <Button
              onClick={() => displayInteraction.call({ interactionId: 'ESTIMATION_GAME_RANKING' })}
            >
              Schätzen Ranking
            </Button>
            <Button onClick={() => Meteor.call('ranking.calculateScore')}>Ränge berechnen</Button>
          </div>
          <div className={classes.estimationGameHalf}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Ränge anzeigen"
                className={classes.group}
                onChange={(e) => showRanksUpTo.call({ mode: e.target.value })}
                value={rankDisplayMode}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio color="primary" />}
                  label="Alle Ränge anzeigen"
                />
                <FormControlLabel
                  value="NONE"
                  control={<Radio color="primary" />}
                  label="Keine Ränge anzeigen"
                />
                <FormControlLabel
                  value="FOUR_TO_TEN"
                  control={<Radio color="primary" />}
                  label="Platz 4 bis 10"
                />
                <FormControlLabel
                  value="THREE_TO_TEN"
                  control={<Radio color="primary" />}
                  label="Platz 3 bis 10"
                />
                <FormControlLabel
                  value="TWO_TO_TEN"
                  control={<Radio color="primary" />}
                  label="Platz 2 bis 10"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Paper>
        <Paper className={classnames(classes.actionWrapper)}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Kandidat auswählen"
              className={classes.candidatesForm}
              onChange={(e) => setCandidate.call({ _id: e.target.value, candidateNumber: 1 })}
              value={(candidates.find((c) => c.candidateNumber === 1) || {})._id || 'NONE'}
            >
              <FormControlLabel
                value="NONE"
                control={<Radio color="primary" />}
                label="Keiner"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  unsetCandidate.call({ candidateNumber: 1 });
                }}
              />
              {candidates.map((c) => (
                <FormControlLabel
                  key={c._id}
                  value={c._id}
                  control={<Radio color="primary" />}
                  label={c.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      </div>
    </div>
    <div className={classes.currentInteraction}>
      {interactions.find((i) => i.state === 'ACTIVE') &&
        getTextForInteraction(interactions.find((i) => i.state === 'ACTIVE'))}
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
    maxWidth: '40%',
    maxHeight: '85vh',
    overflow: 'scroll',
  },
  liveViewWrapper: {
    maxWidth: 512,
    maxHeight: 384,
    overflow: 'hidden',
  },
  actionWrapper: {
    marginTop: 8,
    maxWidth: 512,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color .3s',
  },
  activePaper: {
    backgroundColor: [blue.A400, '!important'],
  },
  estimationGameHalf: {
    width: '50%',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveView: {
    width: 1024,
    height: 768,
    transformOrigin: 'top left',
    top: 20,
    left: 40,
    transform: 'scale(.5)',
  },
  leftColumn: {
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
  },
  currentInteraction: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    minWidth: 200,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
  },
  candidatesForm: {
    flexDirection: 'row',
  },
};

LiveViewControl.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const candidatesHandle = Meteor.subscribe('candidates.allCandidates');

  const interactions = Interactions.find().fetch();
  const { interactionToShow = '', rankDisplayMode = 'ALL' } = AppState.findOne() || {};

  const games = interactions.filter((i) =>
    [interactionTypeNames.FULL_SHOW_GAME, interactionTypeNames.ESTIMATION_VOTING].includes(i.type),
  );

  const votings = interactions.filter((i) => i.type === interactionTypeNames.ESTIMATION_VOTING);

  const candidates = Candidates.find({ name: { $ne: 'Paul' } }).fetch();
  return {
    games,
    votings,
    interactions,
    candidates,
    activeInteraction: interactionToShow,
    rankDisplayMode,
  };
})(withStyles(styles)(LiveViewControl));
