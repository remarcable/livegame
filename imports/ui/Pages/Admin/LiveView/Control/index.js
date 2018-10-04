import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { withStyles } from '@material-ui/core/styles';

import AppState from '/imports/api/appState/collection';

import Interactions from '/imports/api/interactions/collection';
import { interactionTypeNames } from '/imports/api/interactions/types';
import * as interactionStates from '/imports/api/interactions/states';
import sortFullShowGames from '/imports/api/helpers/sortFullShowGames';

import { showRanksUpTo } from '/imports/api/appState/methods';
import { displayInteraction } from '/imports/api/appState/methods';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';
import LiveView from '../';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isReady: PropTypes.bool.isRequired,
  activeInteraction: PropTypes.string.isRequired,
  rankDisplayMode: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired, // TODO: Better proptype
  votings: PropTypes.array.isRequired, // TODO: Better proptype
};

const LiveViewControl = ({ classes, games, votings, activeInteraction, rankDisplayMode }) => (
  <AdminLayout>
    <div className={classes.wrapper}>
      <h1>LiveView</h1>
      <h1>Games</h1>
      {games.map((game) => (
        <StartButton
          key={game._id}
          id={game._id}
          allowedStates={Object.keys(interactionStates)}
          state={game.state}
          text={game.fullShowGame.gameNumber}
          active={game._id === activeInteraction}
        />
      ))}

      <StartButton
        id="FULL_SHOW_GAME_RANKING"
        allowedStates={['FULL_SHOW_GAME_RANKING']}
        state="FULL_SHOW_GAME_RANKING"
        text="FULL_SHOW_GAME_RANKING"
        active={activeInteraction === 'FULL_SHOW_GAME_RANKING'}
      />

      <h1>Votings</h1>
      {votings.map((voting) => (
        <StartButton
          key={voting._id}
          id={voting._id}
          allowedStates={Object.keys(interactionStates)}
          state={voting.state}
          text={voting.estimationVoting.question}
          active={voting._id === activeInteraction}
        />
      ))}

      <StartButton
        id="ESTIMATION_GAME_RANKING"
        allowedStates={['ESTIMATION_GAME_RANKING']}
        state="ESTIMATION_GAME_RANKING"
        text="ESTIMATION_GAME_RANKING"
        active={activeInteraction === 'ESTIMATION_GAME_RANKING'}
      />

      <select
        onChange={(e) =>
          showRanksUpTo.call({ mode: e.target.options[e.target.selectedIndex].value })
        }
        value={rankDisplayMode}
      >
        <option value="ALL">ALL</option>
        <option value="NONE">NONE</option>
        <option value="FOUR_TO_TEN">FOUR_TO_TEN</option>
        <option value="THREE_TO_TEN">THREE_TO_TEN</option>
        <option value="TWO_TO_TEN">TWO_TO_TEN</option>
      </select>

      <div className={classes.liveview}>
        <LiveView />
      </div>
    </div>
  </AdminLayout>
);

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveview: {
    width: 1024,
    height: 768,
    backgroundColor: 'rgba(255, 255, 255, .2)',
    top: 20,
    left: 40,
    transform: 'scale(.5) translateY(-50%)',
    boxShadow: theme.shadows[10],
  },
});

LiveViewControl.propTypes = propTypes;

const startButtonActiveStyle = { fontWeight: 'bold' };
const startButtonNotActiveStyle = {};
const StartButton = ({ id, allowedStates, state, text, active }) => (
  <button
    disabled={!allowedStates.includes(state)}
    style={state === 'ACTIVE' ? startButtonActiveStyle : startButtonNotActiveStyle}
    onClick={() => displayInteraction.call({ interactionId: id })}
  >
    {active ? 'X' : ''} ACTIVATE {text} {active ? 'X' : ''}
  </button>
);

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const isReady = interactionsHandle.ready() && appStateHandle.ready();

  const interactions = Interactions.find().fetch();
  const { interactionToShow = '', rankDisplayMode = 'ALL' } = AppState.findOne() || {};

  const games = interactions
    .filter((i) => i.type === interactionTypeNames.FULL_SHOW_GAME)
    .sort(sortFullShowGames);

  const votings = interactions.filter((i) => i.type === interactionTypeNames.ESTIMATION_VOTING);
  return { games, votings, isReady, activeInteraction: interactionToShow, rankDisplayMode };
})(withStyles(styles)(LiveViewControl));
