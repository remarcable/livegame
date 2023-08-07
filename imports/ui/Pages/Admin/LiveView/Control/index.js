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
import Tooltip from '@material-ui/core/Tooltip';

import { Box } from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DoneIcon from '@material-ui/icons/Done';
import HistoryIcon from '@material-ui/icons/History';

import Button from '@material-ui/core/Button';

import blue from '@material-ui/core/colors/blue';

import AppState from '/imports/api/appState/collection';
import Candidates from '/imports/api/candidates/collection';

import { setCandidate, unsetCandidate } from '/imports/api/candidates/methods';

import Interactions from '/imports/api/interactions/collection';
import { interactionTypeNames } from '/imports/api/interactions/types';
import {
  setClosedState,
  unsetClosedState,
  resetParticipationVotingAnimation,
  startParticipantAnimation,
} from '/imports/api/interactions/methods';
import getTextForInteraction from '/imports/api/helpers/getTextForInteraction';

import { showRanksUpTo, displayInteraction } from '/imports/api/appState/methods';
import { mapSort } from '/imports/api/helpers/mapSort';

import DocumentTitle from '/imports/ui/components/DocumentTitle';
import LiveView from '..';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeInteraction: PropTypes.string.isRequired,
  rankDisplayMode: PropTypes.string.isRequired,
  interactions: PropTypes.array.isRequired, // TODO: Better proptype
  candidates: PropTypes.array.isRequired, // TODO: Better proptype
  currentInteractionText: PropTypes.string,
};

const LiveViewControl = ({
  classes,
  interactions,
  candidates,
  activeInteraction,
  rankDisplayMode,
  currentInteractionText,
}) => (
  <>
    <DocumentTitle>Liveview-Steuerung</DocumentTitle>
    <div className={classes.wrapper}>
      <Paper className={classes.interactions}>
        <Table className={classes.table}>
          <TableHead className={classes.stickyHeader}>
            <TableRow>
              <TableCell>Start</TableCell>
              <TableCell>Titel</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {interactions.map((i) => (
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
                  <Tooltip title="Auf Liveview anzeigen">
                    <span>
                      <IconButton
                        onClick={() => displayInteraction.call({ interactionId: i._id })}
                        disabled={i.state !== 'CLOSED'}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {i.estimationVoting && i.estimationVoting.question}
                  {i.fullShowGame && `${i.fullShowGame.gameNumber}. ${i.title}`}
                  {i.participationVoting && `Zuschauer-Auswahl: ${i.title}`}
                  {i.participationVoting && (
                    <Box mt={2}>
                      <Button
                        size="small"
                        onClick={() => selectRandomParticipantForGame(i._id)}
                        startIcon={i.participationVoting?.selectedParticipant ? <DoneIcon /> : null}
                        disabled={i._id !== activeInteraction}
                      >
                        1. Zufälligen Kandidaten auswählen
                      </Button>
                      <br />
                      <span>
                        <Button
                          size="small"
                          onClick={() =>
                            startParticipantAnimation.call({ participationVotingId: i._id })
                          }
                          startIcon={
                            ['ANIMATING', 'CONFIRMED'].includes(
                              i.participationVoting?.selectionState,
                            ) ? (
                              <DoneIcon />
                            ) : null
                          }
                          disabled={
                            i.participationVoting?.selectedParticipant === null ||
                            i.participationVoting?.selectionState === 'ANIMATING' ||
                            i.participationVoting?.selectionState === 'CONFIRMED' ||
                            i._id !== activeInteraction
                          }
                        >
                          2. Animation starten
                        </Button>
                        <Tooltip title="Animation zurücksetzen">
                          <Box ml={1} display="inline-block">
                            <IconButton
                              size="small"
                              disabled={
                                i.participationVoting?.selectionState === 'WAITING' ||
                                i._id !== activeInteraction
                              }
                              onClick={() =>
                                resetParticipationVotingAnimation.call({
                                  participationVotingId: i._id,
                                })
                              }
                            >
                              <HistoryIcon />
                            </IconButton>
                          </Box>
                        </Tooltip>
                      </span>
                    </Box>
                  )}
                  {i.participationVoting?.selectedParticipant && (
                    <Box mt={1}>
                      <Tooltip title={i.participationVoting?.email || ''}>
                        <Box color="text.secondary" width="fit-content">
                          Kandidat: {i.participationVoting?.fullName}
                          {i.participationVoting?.alias &&
                            ` (${i.participationVoting?.alias})`}{' '}
                          {i.participationVoting?.selectionState === 'CONFIRMED' && '✅'}
                        </Box>
                      </Tooltip>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {i.state === 'CLOSED' && (
                      <Tooltip title="Interaktion wurde bereits angezeigt und wurde durch einen Stern in der App markiert. Ein Klick auf den Button setzt diesen Zustand zurück.">
                        <span>
                          <IconButton
                            onClick={() => unsetClosedState.call({ interactionId: i._id })}
                          >
                            <StarIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    {(i.state === null || i.state === 'ACTIVE') && (
                      <Tooltip
                        title={
                          i.state === 'ACTIVE'
                            ? 'Interaktion wird gerade angezeigt'
                            : 'Interaktion wurde bisher noch nicht angezeigt. Mit Klick auf den Button wird die Interaktion mit einem Stern in der App markiert.'
                        }
                      >
                        <span>
                          <IconButton
                            onClick={() => setClosedState.call({ interactionId: i._id })}
                            disabled={i.state === 'ACTIVE'}
                          >
                            <StarBorderIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </Box>
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
        <div>
          <Paper
            className={classnames(classes.actionWrapper, {
              [classes.activePaper]:
                activeInteraction === 'ESTIMATION_GAME_RANKING' ||
                activeInteraction === 'FULL_SHOW_GAME_RANKING',
            })}
          >
            <Box>
              <div className={classes.buttonGroup}>
                <Button
                  onClick={() =>
                    displayInteraction.call({ interactionId: 'FULL_SHOW_GAME_RANKING' })
                  }
                  color={activeInteraction === 'FULL_SHOW_GAME_RANKING' ? 'primary' : 'default'}
                >
                  Full Show Ranking
                </Button>
                <Button
                  onClick={() => {
                    Meteor.call('ranking.calculateScore');
                    displayInteraction.call({ interactionId: 'ESTIMATION_GAME_RANKING' });
                  }}
                  color={activeInteraction === 'ESTIMATION_GAME_RANKING' ? 'primary' : 'default'}
                >
                  Schätzen Ranking
                </Button>
                <Tooltip title="Für Schätzen müssen die Ränge manuell berechnet werden, da dies sehr aufwändig ist. Diesen Button klicken sobald alle User abgestimmt haben.">
                  <span>
                    <Button onClick={() => Meteor.call('ranking.calculateScore')}>
                      Schätzen-R. aktualisieren
                    </Button>
                  </span>
                </Tooltip>
              </div>
            </Box>
            <Box>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Ränge anzeigen"
                  className={classes.group}
                  onChange={(e) => showRanksUpTo.call({ mode: e.target.value })}
                  value={rankDisplayMode}
                >
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
                  <FormControlLabel
                    value="ALL"
                    control={<Radio color="primary" />}
                    label="Alle Ränge anzeigen"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
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
                  label="Kein Kandidat"
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
        {/* <Paper className={classes.games}>
          <ParticipantsSelection participationVotings={participationVotings} />
        </Paper> */}
      </div>
    </div>
    <div className={classes.currentInteraction}>{currentInteractionText}</div>
  </>
);

const styles = ({ breakpoints, palette }) => ({
  wrapper: {
    paddingTop: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 32,
    [breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
  selected: {
    backgroundColor: [blue[800], '!important'],
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: palette.background.paper,
    zIndex: 5,
  },
  tableRowRoot: {
    transition: `background-color 200ms`, // TODO: use theme.transitions.duration.shorter
    '&$estimationGame': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  estimationGame: {},
  interactions: {
    maxWidth: '50%',
    minWidth: '40%',
    maxHeight: '85vh',
    overflow: 'scroll',
    [breakpoints.down('sm')]: {
      maxWidth: '80%',
      minWidth: '80%',
      maxHeight: '50vh',
    },
  },
  liveViewWrapper: {
    maxWidth: 512,
    maxHeight: 384,
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(135deg, #334155 15%, #020617 90%)',
    border: '2px solid #37474f',
    borderRadius: 8,
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
    backgroundColor: [blue[800], '!important'],
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
    [breakpoints.down('sm')]: {
      flexDirection: 'row',
      gap: 16,
    },
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
});

LiveViewControl.propTypes = propTypes;

async function selectRandomParticipantForGame(participationVotingId) {
  const selectedUserId = await Meteor.callAsync('participationVotings.selectRandomParticipant', {
    participationVotingId,
  });

  return selectedUserId;
}

export default withTracker(() => {
  Meteor.subscribe('interactions.allInteractions');
  Meteor.subscribe('appState.admin');
  Meteor.subscribe('candidates.allCandidates');
  Meteor.subscribe('participationVotings.selectedParticipants');

  const interactions = Interactions.find().fetch();
  const users = Meteor.users.find().fetch();

  let sortedInteractions = [];

  try {
    sortedInteractions = mapSort(interactions);
  } catch (e) {
    console.log(`Fehler beim Sortieren!`, e.message);
  }

  const { interactionToShow = '', rankDisplayMode = 'ALL' } = AppState.findOne() || {};

  const filteredInteractions = sortedInteractions.filter((i) =>
    [
      interactionTypeNames.FULL_SHOW_GAME,
      interactionTypeNames.ESTIMATION_VOTING,
      interactionTypeNames.PARTICIPATION_VOTING,
    ].includes(i.type),
  );

  const filteredInteractionsWithParticipationVotingData = filteredInteractions.map(
    (interaction) => {
      if (interaction.type !== interactionTypeNames.PARTICIPATION_VOTING) {
        return interaction;
      }

      const selectedParticipantId = interaction.participationVoting.selectedParticipant;
      if (!selectedParticipantId) {
        return interaction;
      }

      const selectedParticipant = users.find((u) => u._id === selectedParticipantId) || {};

      return {
        ...interaction,
        participationVoting: {
          ...interaction.participationVoting,
          fullName: `${selectedParticipant.firstName} ${selectedParticipant.lastName}`,
          alias: selectedParticipant.alias,
          email: selectedParticipant.email,
        },
      };
    },
  );

  const candidates = Candidates.find({ name: { $ne: 'Paul' } }).fetch();

  const currentInteraction = interactions.find((i) => i.state === 'ACTIVE');
  const currentInteractionText = currentInteraction && getTextForInteraction(currentInteraction);

  return {
    currentInteractionText,
    interactions: filteredInteractionsWithParticipationVotingData,
    candidates,
    activeInteraction: interactionToShow,
    rankDisplayMode,
  };
})(withStyles(styles)(LiveViewControl));
