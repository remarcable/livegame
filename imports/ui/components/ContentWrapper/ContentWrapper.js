import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { spacing } from 'material-ui/styles';

import AppState from '../../../api/appState/collection';
import Games from '../../../api/games/collection';
import Submissions from '../../../api/submissions/collection';

import LoginPage from '../../Pages/Login';
import ActiveGamePage from '../../Pages/ActiveGame';
import GameEndedPage from '../../Pages/GameEnded';
import LoadingPage from '../../Pages/Loading';
import WaitingPage from '../../Pages/Waiting';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  gameIsActive: PropTypes.bool.isRequired,
  liveGameEnded: PropTypes.bool.isRequired,
  userHasSubmittedForCurrentGame: PropTypes.bool.isRequired,
  gameQuestion: PropTypes.string,
};

const ContentWrapper = ({ isReady, isLoggedIn, gameIsActive, liveGameEnded, userHasSubmittedForCurrentGame, gameQuestion }) => {
  if (!isLoggedIn) {
    return (
      <div style={styles}>
        <LoginPage wrapperStyles={wrapperStyles} />
      </div>
    );
  }

  if (!isReady) {
    return (
      <div style={styles}>
        <LoadingPage wrapperStyles={wrapperStyles} />
      </div>
    );
  }

  if (liveGameEnded) {
    return (
      <div style={styles}>
        <GameEndedPage wrapperStyles={wrapperStyles} />
      </div>
    );
  }

  if (gameIsActive && !userHasSubmittedForCurrentGame) {
    return (
      <div style={styles}>
        <ActiveGamePage wrapperStyles={wrapperStyles} question={gameQuestion} />
      </div>
    );
  }

  return (
    <div style={styles}>
      <WaitingPage wrapperStyles={wrapperStyles} />
    </div>
  );
};

ContentWrapper.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  flexGrow: 1,
};

const wrapperStyles = {
  margin: spacing.desktopGutterLess,
};

export default ContentWrapperContainer = createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.active');
  const submissionsHandle = Meteor.subscribe('submissions.own');
  const appStateHandle = Meteor.subscribe('appState');

  const isReady = gamesHandle.ready() && submissionsHandle.ready() && appStateHandle.ready();

  const userId = Meteor.userId();
  const currentGame = Games.findOne({ state: 'active' }) || {};
  const appState = AppState.findOne() || {};
  const gameId = currentGame._id;
  const gameQuestion = currentGame.question;

  const isLoggedIn = !!userId;
  const liveGameEnded = appState.gameEnded || false;
  const gameIsActive = !!gameId;
  const userHasSubmittedForCurrentGame = !!Submissions.findOne({ userId, gameId });
  return {
    isReady,
    isLoggedIn,
    gameIsActive,
    liveGameEnded,
    userHasSubmittedForCurrentGame,
    gameQuestion,
  };
}, ContentWrapper);
