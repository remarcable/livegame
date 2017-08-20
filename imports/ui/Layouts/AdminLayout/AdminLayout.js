import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { blueGrey900 } from 'material-ui/styles/colors';

import Footer from '../../components/Footer';
import GamesList from '../../components/GamesList';
import AdminMethods from '../../components/AdminMethods';

import Games from '../../../api/games/collection';
import AppState from '../../../api/appState/collection';

import {
  startGame,
  stopGame,
} from '../../../api/games/methods';

import {
  endLiveGame,
  unendLiveGame,
  setHintText,
  showScoresOnLiveView,
  showVotingOnLiveView,
} from '../../../api/appState/methods';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      state: PropTypes.string,
    }),
  ).isRequired,
  isVoting: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool,
  hintText: PropTypes.string,
  numberOfUsers: PropTypes.number.isRequired,
};

const AdminLayout = ({ isReady, games, isVoting, gameEnded = false, hintText, numberOfUsers }) => (
  <div style={wrapperStyles}>
    <AppBar
      title="LIVESPIEL"
      showMenuIconButton={false}
      titleStyle={{ textAlign: 'center', fontWeight: 300 }}
      iconElementRight={
        <div
          style={{ paddingRight: 10, transform: 'translateY(90%)', color: '#303030' }}
        >
          {numberOfUsers} Users
        </div>
      }
    />
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <AdminMethods
        isVoting={isVoting}
        setHintText={newHintText => setHintText.call({ hintText: newHintText })}
        showVotingOnLiveView={() => showVotingOnLiveView.call()}
        showScoresOnLiveView={() => showScoresOnLiveView.call()}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Chip
          backgroundColor={blueGrey900}
          style={{ fontStyle: !hintText && 'italic' }}
        >
          {hintText || 'Kein Text'}
        </Chip>

        {
          isReady && <GamesList
            games={games}
            startGame={gameId => startGame.call({ gameId })}
            stopGame={gameId => stopGame.call({ gameId })}
          />
        }

        <div>
          {
            gameEnded
            ? <RaisedButton onTouchTap={() => unendLiveGame.call()} label="Reopen Livegame" backgroundColor={blueGrey900} />
            : <RaisedButton onTouchTap={() => endLiveGame.call()} label="Close Livegame" backgroundColor={blueGrey900} />
          }
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

AdminLayout.propTypes = propTypes;

const wrapperStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default createContainer(() => {
  const userHandle = Meteor.subscribe('users.loggedIn');
  const gamesHandle = Meteor.subscribe('games.allGames');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const numberOfUsers = Counts.get('users.loggedInCount');

  const isReady = gamesHandle.ready() && appStateHandle.ready() && userHandle.ready();

  const games = Games.find().fetch();

  const appState = AppState.findOne() || {};
  const isVoting = appState.scoreboard === 'voting';
  const { gameEnded, hintText } = appState;

  return { isReady, games, isVoting, gameEnded, hintText, numberOfUsers };
}, AdminLayout);
