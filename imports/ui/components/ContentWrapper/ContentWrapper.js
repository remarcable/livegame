import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { spacing } from 'material-ui/styles';

import AppState from '../../../api/appState/collection';
import Games from '../../../api/games/collection';
import Votings from '../../../api/votings/collection';
import Submissions from '../../../api/submissions/collection';
import VotingSubmissions from '../../../api/votingSubmissions/collection';

import LoginPage from '../../Pages/Login';
import ActiveGamePage from '../../Pages/ActiveGame';
import ActiveVotingPage from '../../Pages/ActiveVoting';
import GameEndedPage from '../../Pages/GameEnded';
import LoadingPage from '../../Pages/Loading';
import WaitingPage from '../../Pages/Waiting';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  liveGameEnded: PropTypes.bool.isRequired,
  hintText: PropTypes.string,

  gameIsActive: PropTypes.bool.isRequired,
  gameQuestion: PropTypes.string,
  userHasSubmittedForCurrentGame: PropTypes.bool.isRequired,

  votingIsActive: PropTypes.bool.isRequired,
  votingQuestion: PropTypes.string,
  userHasSubmittedForCurrentVoting: PropTypes.bool.isRequired,
};

const ContentWrapper = ({
  isReady,
  isLoggedIn,
  liveGameEnded,
  hintText,

  gameIsActive,
  gameQuestion,
  userHasSubmittedForCurrentGame,

  votingIsActive,
  votingQuestion,
  userHasSubmittedForCurrentVoting,
}) => {
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

  if (votingIsActive && !userHasSubmittedForCurrentVoting) {
    return (
      <div style={styles}>
        <ActiveVotingPage wrapperStyles={wrapperStyles} question={votingQuestion} />
      </div>
    );
  }

  return (
    <div style={styles}>
      <WaitingPage wrapperStyles={wrapperStyles} hintText={hintText} />
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

export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.active');
  const votingsHandle = Meteor.subscribe('votings.active');
  const gameSubmissionsHandle = Meteor.subscribe('submissions.own');
  const votingSubmissionsHandle = Meteor.subscribe('votingSubmissions.own');
  const appStateHandle = Meteor.subscribe('appState');

  const isReady = gamesHandle.ready()
    && votingsHandle.ready()
    && gameSubmissionsHandle.ready()
    && votingSubmissionsHandle.ready()
    && appStateHandle.ready();

  const userId = Meteor.userId();
  const appState = AppState.findOne() || {};
  const hintText = appState.hintText;

  const isLoggedIn = !!userId;
  const liveGameEnded = appState.gameEnded || false;

  const currentGame = Games.findOne({ state: 'active' }) || {};
  const gameId = currentGame._id;
  const gameIsActive = !!gameId;
  const gameQuestion = currentGame.question;
  const userHasSubmittedForCurrentGame = !!Submissions.findOne({ userId, gameId });

  const currentVoting = Votings.findOne({ state: 'active' }) || {};
  const votingId = currentVoting._id;
  const votingIsActive = !!votingId;
  const votingQuestion = currentVoting.question;
  const userHasSubmittedForCurrentVoting = !!VotingSubmissions.findOne({ userId, votingId });

  return {
    isReady,
    isLoggedIn,
    liveGameEnded,
    hintText,

    gameIsActive,
    gameQuestion,
    userHasSubmittedForCurrentGame,

    votingIsActive,
    votingQuestion,
    userHasSubmittedForCurrentVoting,
  };
}, ContentWrapper);
