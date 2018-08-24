import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import AppState from '/imports/api/appState/collection';

import Interactions from '/imports/api/interactions/collection';
import { typeNames } from '/imports/api/interactions/types';
import sortFullShowGames from '/imports/api/helpers/sortFullShowGames';

import { displayInteraction } from '/imports/api/appState/methods';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  activeInteraction: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired, // TODO: Better proptype
  votings: PropTypes.array.isRequired, // TODO: Better proptype
};

const LiveViewControl = ({ isReady, games, votings, activeInteraction }) => (
  <AdminLayout>
    <span>
      <h1>Games</h1>
      {games.map((game) => (
        <StartButton
          key={game._id}
          id={game._id}
          allowedStates={['ACTIVE', 'CLOSED']}
          state={game.state}
          text={game.fullShowGame.gameNumber}
          active={game._id === activeInteraction}
        />
      ))}

      <h1>Votings</h1>
      {votings.map((voting) => (
        <StartButton
          key={voting._id}
          id={voting._id}
          allowedStates={['ACTIVE', 'CLOSED']}
          state={voting.state}
          text={voting.estimationVoting.question}
          active={voting._id === activeInteraction}
        />
      ))}
    </span>
  </AdminLayout>
);

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

const interactionTypeNames = typeNames();
export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const isReady = interactionsHandle.ready() && appStateHandle.ready();

  const interactions = Interactions.find().fetch();
  const { interactionToShow = '' } = AppState.findOne() || {};

  const games = interactions
    .filter((i) => i.type === interactionTypeNames.FULL_SHOW_GAME)
    .sort(sortFullShowGames);

  const votings = interactions.filter((i) => i.type === interactionTypeNames.ESTIMATION_VOTING);
  return { games, votings, isReady, activeInteraction: interactionToShow };
})(LiveViewControl);
