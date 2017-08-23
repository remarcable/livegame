import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';

import ShowLayout from './ShowLayout';
import EditLayout from './EditLayout';
import Footer from '../../components/Footer';

import Games from '../../../api/games/collection';
import AppState from '../../../api/appState/collection';

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
    {/* <ShowLayout
      isReady={isReady}
      isVoting={isVoting}
      games={games}
      gameEnded={gameEnded}
      hintText={hintText}
    /> */}
    <EditLayout />
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
