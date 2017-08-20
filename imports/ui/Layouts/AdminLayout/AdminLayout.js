import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from '../../components/Footer';

import GamesList from '../../components/GamesList';

import Games from '../../../api/games/collection';
import AppState from '../../../api/appState/collection';

import {
  startGame as startGameMethod,
  stopGame as stopGameMethod,
} from '../../../api/games/methods';

import {
  endLiveGame as endLiveGameMethod,
  unendLiveGame as unendLiveGameMethod,
  setHintText as setHintTextMethod,
  showScoresOnScoreboard as showScoresOnScoreboardMethod,
  showVotingOnScoreboard as showVotingOnScoreboardMethod,
} from '../../../api/appState/methods';

import {
  setAlias as setAliasMethod,
  unsetAlias as unsetAliasMethod,
} from '../../../api/alias/methods';

const AdminLayout = ({ isReady, games, isVoting, gameEnded, hintText }) => (
  <div style={wrapperStyles}>
    <AppBar
      title="LIVESPIEL"
      showMenuIconButton={false}
      titleStyle={{ textAlign: 'center', fontWeight: 300 }}
    />
    <div style={{ flexGrow: 1 }}>
      <h1>Admin</h1>
      <div>
        {
          isReady && <GamesList
            games={games}
            startGame={startGame}
            stopGame={stopGame}
          />
        }
      </div>
      {/* <div>
        <input type="number" placeholder="votingNumber" />
        <button>Start voting</button>
        <button>Stop voting</button>
      </div>
      <div>
        {
          gameEnded
          ? <RaisedButton onTouchTap={unendLiveGame} label="Undo End the world (livegame)" />
          : <RaisedButton onTouchTap={endLiveGame} label="End the world (livegame)" />
        }
      </div>
      <div>
        {hintText}
        <input type="text" placeholder="text" ref={(c) => { AdminLayout.hintText = c; }} />
        <RaisedButton onTouchTap={() => setHintText(AdminLayout.hintText.value)} label="Set hintText" />
      </div>
      <div>
        {
          isVoting
          ? <RaisedButton onTouchTap={showScoresOnScoreboard} label="Show scoreboard" />
          : <RaisedButton onTouchTap={showVotingOnScoreboard} label="Show voting" />
        }
      </div>
      <div>
        <input type="text" placeholder="userId" ref={(c) => { AdminLayout.aliasUserId = c; }} />
        <RaisedButton onTouchTap={() => setAlias(AdminLayout.aliasUserId.value)} label="Set alias" />
        <RaisedButton onTouchTap={() => unsetAlias(AdminLayout.aliasUserId.value)} label="Remove alias" />
      </div> */}
    </div>
    <Footer />
  </div>
);

const wrapperStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const startGame = gameId => startGameMethod.call({ gameId });
const stopGame = gameId => stopGameMethod.call({ gameId });

const endLiveGame = () => endLiveGameMethod.call();
const unendLiveGame = () => unendLiveGameMethod.call();

const setHintText = hintText => setHintTextMethod.call({ hintText });

const showScoresOnScoreboard = () => showScoresOnScoreboardMethod.call();
const showVotingOnScoreboard = () => showVotingOnScoreboardMethod.call();

const setAlias = userId => setAliasMethod.call({ userId });
const unsetAlias = userId => unsetAliasMethod.call({ userId });


export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.allGames');
  const appStateHandle = Meteor.subscribe('appState.admin');

  const isReady = gamesHandle.ready() && appStateHandle.ready();

  const games = Games.find().fetch();

  const appState = AppState.findOne() || {};
  const isVoting = appState.scoreboard === 'voting';
  const { gameEnded, hintText } = appState;

  return { isReady, games, isVoting, gameEnded, hintText };
}, AdminLayout);
