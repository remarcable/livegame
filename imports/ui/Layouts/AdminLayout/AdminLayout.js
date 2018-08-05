import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from '/imports/ui/theme';

import Login from '/imports/ui/Pages/Admin/Login';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  userIsLoggedInAndAdmin: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const AdminLayout = ({ children, isReady, userIsLoggedInAndAdmin }) => {
  if (!isReady) {
    return null;
  }

  if (!userIsLoggedInAndAdmin) {
    return (
      <MuiThemeProvider theme={theme}>
        <Login />
      </MuiThemeProvider>
    );
  }
  // todo only add MuiThemeProvider once
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

AdminLayout.propTypes = propTypes;

export default withTracker(() => {
  const isReady = Meteor.subscribe('users.loggedIn').ready();
  const userIsLoggedInAndAdmin = Meteor.userIsAdmin();

  return { isReady, userIsLoggedInAndAdmin };
})(AdminLayout);
