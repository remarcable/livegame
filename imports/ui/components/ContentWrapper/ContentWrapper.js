import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { spacing } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';

import AppState from '../../../api/appState/collection';
import Interactions from '../../../api/interactions/collection';
import Submissions from '../../../api/submissions/collection';

import * as interactionStates from '../../../api/interactions/interactionStates';
import * as interactionTypes from '../../../api/interactions/interactionTypes';

import LoginPage from '../../Pages/Login';
import ActiveGamePage from '../../Pages/ActiveGame';
import ActiveVotingPage from '../../Pages/ActiveVoting';
import GameEndedPage from '../../Pages/GameEnded';
import LoadingPage from '../../Pages/Loading';
import WaitingPage from '../../Pages/Waiting';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  hintText: PropTypes.string,

  alias: PropTypes.string,
  rank: PropTypes.number,
  email: PropTypes.string,

  showInteraction: PropTypes.bool.isRequired,
  interactionType: PropTypes.string,
  interactionData: PropTypes.object.isRequired,
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
  };

  handleSnackbarRequestClose = () => {
    this.setState({ snackbarOpen: false });
  };

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
      onFirstValue: () => {
        this.setState({ firstAlias: alias });
      },
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
      onFirstValue: () => {
        this.setState({ firstRank: rank });
      },
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
      hintText,

      email,

      showInteraction,
      interactionType,
      interactionData: { guessingGame, guessingVoting, fullShowVoting, announcement },
    } = this.props;

    if (!isReady) {
      return <LoadingPage wrapperStyles={wrapperStyles} />;
    }

    if (!isLoggedIn) {
      return <LoginPage wrapperStyles={wrapperStyles} />;
    }
    // TODO showInteraction is very dirty. We should solve that differently!

    if (!showInteraction) {
      return <WaitingPage wrapperStyles={wrapperStyles} hintText={hintText} />;
    }

    switch (interactionType) {
      case interactionTypes.GUESSING_GAME:
        return <ActiveGamePage wrapperStyles={wrapperStyles} question={guessingGame.question} />;
      case interactionTypes.GUESSING_VOTING:
        return (
          <ActiveVotingPage wrapperStyles={wrapperStyles} question={guessingVoting.question} />
        );
      case interactionTypes.GUESSING_WAITING:
        return <WaitingPage wrapperStyles={wrapperStyles} hintText={hintText} />;
      case interactionTypes.GUESSING_ENDED:
        return <GameEndedPage wrapperStyles={wrapperStyles} email={email} />;

      case interactionTypes.FULL_SHOW_WAITING:
        return <div>FULL_SHOW_WAITING</div>; // maybe use this as default instead of loading?
      case interactionTypes.FULL_SHOW_VOTING:
        return <div>FULL_SHOW_VOTING</div>; // use fullShowVoting

      case interactionTypes.ANNOUNCEMENT:
        return <div>ANNOUNCEMENT</div>; // use announcement
      default:
        return <div>DEFAULT CASE</div>;
    }
  };

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

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.active');
  const userHandle = Meteor.subscribe('users.loggedIn');
  const submissionsHandle = Meteor.subscribe('submissions.own');
  const appStateHandle = Meteor.subscribe('appState');

  const isReady =
    interactionsHandle.ready() &&
    userHandle.ready() &&
    submissionsHandle.ready() &&
    appStateHandle.ready();

  const userId = Meteor.userId();
  const { alias = null, rank = null, email = null } = Meteor.user() || {};

  const appState = AppState.findOne() || {};
  const { hintText } = appState;

  const isLoggedIn = !!userId;

  const interactionData = Interactions.findOne({ state: interactionStates.ACTIVE }) || {};
  const { _id: interactionId, type: interactionType = null } = interactionData;

  const submissionForInteraction = !!Submissions.findOne({ userId, interactionId });
  const showInteraction = !!interactionId && !submissionForInteraction;

  return {
    isReady,
    isLoggedIn,
    hintText,

    rank,
    alias,
    email,

    showInteraction,
    interactionType,
    interactionData,
  };
})(ContentWrapper);
