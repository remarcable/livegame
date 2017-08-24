import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/content/create';

import Login from '../../Pages/AdminLogin';

import ShowLayout from './ShowLayout';
import EditLayout from './EditLayout';
import Footer from '../../components/Footer';

import Games from '../../../api/games/collection';
import Votings from '../../../api/votings/collection';
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
  liveViewShowsVoting: PropTypes.bool.isRequired,
  userIsAdmin: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool,
  hintText: PropTypes.string,
  numberOfUsers: PropTypes.number.isRequired,
};

class AdminLayout extends Component {
  state = { editMode: false }
  render() {
    const {
      isReady,
      games,
      liveViewShowsVoting,
      gameEnded = false,
      hintText,
      numberOfUsers,
      userIsAdmin,
    } = this.props;
    const { editMode } = this.state;

    if (!Meteor.userId() || !userIsAdmin) return <Login />;

    return (
      <div style={wrapperStyles}>
        <AppBar
          title="LIVESPIEL"
          showMenuIconButton={false}
          titleStyle={{ textAlign: 'center', fontWeight: 300 }}
          iconElementRight={
            <div style={{ paddingRight: 10, transform: 'translateY(90%)', color: '#303030' }}>
              {numberOfUsers} Users
            </div>
          }
        />
        {
          editMode
          ? <EditLayout isReady={isReady} games={games} />
          : <ShowLayout
            isReady={isReady}
            liveViewShowsVoting={liveViewShowsVoting}
            games={games}
            gameEnded={gameEnded}
            hintText={hintText}
          />
        }
        <FloatingActionButton
          style={{ position: 'absolute', bottom: 20, right: 20 }}
          secondary={editMode}
          onClick={() => this.setState({ editMode: !editMode })}
        >
          <EditIcon style={{ fill: 'white' }} />
        </FloatingActionButton>
        <Footer />
      </div>
    );
  }
}
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
  const votingsHandle = Meteor.subscribe('votings.allVotings');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const numberOfUsers = Counts.get('users.loggedInCount');

  const isReady = gamesHandle.ready()
    && votingsHandle.ready()
    && appStateHandle.ready()
    && userHandle.ready();
  const userIsAdmin = Meteor.userIsAdmin();

  const games = Games.find().fetch();

  const appState = AppState.findOne() || {};
  const liveViewShowsVoting = appState.liveview === 'voting';
  const { gameEnded, hintText, gamesOrder } = appState;

  const sortedGamesWithVotings = games
  .sort((a, b) => gamesOrder.indexOf(a._id) - gamesOrder.indexOf(b._id))
  .map((game) => {
    if (game.votingId) return { ...game, voting: Votings.findOne(game.votingId) };
    return game;
  });

  return {
    isReady,
    games: sortedGamesWithVotings,
    liveViewShowsVoting,
    gameEnded,
    hintText,
    numberOfUsers,
    userIsAdmin,
  };
}, AdminLayout);
