import '/imports/startup/client/admin';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import { ThemeProvider } from '@material-ui/styles';
import { theme } from '/imports/ui/styles/theme';

import Login from '/imports/ui/Pages/Admin/Login';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  userIsLoggedInAndAdmin: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const LiveViewLayout = ({ children, isReady, userIsLoggedInAndAdmin }) => {
  if (!isReady) {
    return null;
  }

  if (!userIsLoggedInAndAdmin) {
    return <Login />;
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

LiveViewLayout.propTypes = propTypes;

export default withTracker(() => {
  const isReady = Meteor.subscribe('users.loggedIn').ready();
  const userIsLoggedInAndAdmin = Meteor.userIsAdmin();

  return { isReady, userIsLoggedInAndAdmin };
})(LiveViewLayout);
