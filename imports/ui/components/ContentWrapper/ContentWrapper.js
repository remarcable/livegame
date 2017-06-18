import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { spacing } from 'material-ui/styles';

import Games from '../../../api/games/collection';
import Submissions from '../../../api/submissions/collection';

import LoginPage from '../../Pages/Login';
import ActiveGamePage from '../../Pages/ActiveGame';
import WaitingPage from '../../Pages/Waiting';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  gameIsActive: PropTypes.bool.isRequired,
  userHasSubmittedForCurrentGame: PropTypes.bool.isRequired,
};

const ContentWrapper = ({ isLoggedIn, gameIsActive, userHasSubmittedForCurrentGame }) => {
  if (!isLoggedIn) {
    return (
      <div style={styles}>
        <LoginPage wrapperStyles={wrapperStyles} />
      </div>
    );
  }

  if (gameIsActive && !userHasSubmittedForCurrentGame) {
    return (
      <div style={styles}>
        <ActiveGamePage wrapperStyles={wrapperStyles} />
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

  const userId = Meteor.userId();
  const currentGame = Games.findOne({ state: 'active' }) || {};
  const gameId = currentGame._id;

  const isLoggedIn = !!userId;
  const gameIsActive = !!gameId;
  const userHasSubmittedForCurrentGame = !!Submissions.findOne({ userId, gameId });
  return { isLoggedIn, gameIsActive, userHasSubmittedForCurrentGame };
}, ContentWrapper);
