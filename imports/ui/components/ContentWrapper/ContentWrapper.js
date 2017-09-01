import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { spacing } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';

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

  alias: PropTypes.string,
  rank: PropTypes.string,

  gameIsActive: PropTypes.bool.isRequired,
  gameQuestion: PropTypes.string,
  userHasSubmittedForCurrentGame: PropTypes.bool.isRequired,

  votingIsActive: PropTypes.bool.isRequired,
  votingQuestion: PropTypes.string,
  userHasSubmittedForCurrentVoting: PropTypes.bool.isRequired,
};

class ContentWrapper extends Component {
  state = {
    snackbarMessage: '',
    snackbarOpen: false,
    oldAlias: null,
    firstAlias: null,
    oldRank: null,
    firstRank: null,
  };

  componentWillReceiveProps({ alias, rank }) {
    this.updateSnackbarAliasIfNeeded(alias);
    this.updateSnackbarRankIfNeeded(rank);
  }

  setMessage = (snackbarMessage) => {
    this.setState({ snackbarMessage, snackbarOpen: true });
  }

  handleSnackbarRequestClose = () => {
    this.setState({ snackbarOpen: false });
  }

  updateSnackbarMessageIfNeeded({ value, oldValue, firstValue, onFirstValue, onNewValue }) {
    const firstValueIsSet = firstValue !== null;
    const isFirstValue = value === firstValue;
    const equalsOldValue = value === oldValue;
    const newValueIsUnset = value === null;

    if (!firstValueIsSet && !isFirstValue) {
      onFirstValue();
    } else if (!isFirstValue && !equalsOldValue && !newValueIsUnset) {
      onNewValue();
    }
  }

  updateSnackbarAliasIfNeeded(alias) {
    const { oldAlias, firstAlias } = this.state;

    this.updateSnackbarMessageIfNeeded({
      value: alias,
      oldValue: oldAlias,
      firstValue: firstAlias,
      onFirstValue: () => { this.setState({ firstAlias: alias }); },
      onNewValue: () => {
        this.setState({ oldAlias: alias });
        this.setMessage('Ihnen wurden ein neuer Deckname zugewiesen.');
      },
    });
  }

  updateSnackbarRankIfNeeded(rank) {
    const { oldRank, firstRank } = this.state;

    this.updateSnackbarMessageIfNeeded({
      value: rank,
      oldValue: oldRank,
      firstValue: firstRank,
      onFirstValue: () => { this.setState({ firstRank: rank }); },
      onNewValue: () => {
        this.setState({ oldRank: rank });
        this.setMessage('Rang wurde aktualisiert.');
      },
    });
  }

  renderPage = () => {
    const {
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
    } = this.props;

    if (!isReady) return <LoadingPage wrapperStyles={wrapperStyles} />;
    if (!isLoggedIn) return <LoginPage wrapperStyles={wrapperStyles} />;
    if (liveGameEnded) return <GameEndedPage wrapperStyles={wrapperStyles} />;

    if (gameIsActive && !userHasSubmittedForCurrentGame) {
      return <ActiveGamePage wrapperStyles={wrapperStyles} question={gameQuestion} />;
    }

    if (votingIsActive && !userHasSubmittedForCurrentVoting) {
      return <ActiveVotingPage wrapperStyles={wrapperStyles} question={votingQuestion} />;
    }

    return <WaitingPage wrapperStyles={wrapperStyles} hintText={hintText} />;
  }

  render() {
    return (
      <div style={styles}>
        {this.renderPage()}
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbarRequestClose}
        />
      </div>
    );
  }
}

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
  const userHandle = Meteor.subscribe('users.loggedIn');
  const votingsHandle = Meteor.subscribe('votings.active');
  const gameSubmissionsHandle = Meteor.subscribe('submissions.own');
  const votingSubmissionsHandle = Meteor.subscribe('votingSubmissions.own');
  const appStateHandle = Meteor.subscribe('appState');

  const isReady = gamesHandle.ready()
  && userHandle.ready()
  && votingsHandle.ready()
  && gameSubmissionsHandle.ready()
  && votingSubmissionsHandle.ready()
  && appStateHandle.ready();

  const userId = Meteor.userId();
  const { alias = null, rank = null } = Meteor.user() || {};

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

    rank,
    alias,

    gameIsActive,
    gameQuestion,
    userHasSubmittedForCurrentGame,

    votingIsActive,
    votingQuestion,
    userHasSubmittedForCurrentVoting,
  };
}, ContentWrapper);
