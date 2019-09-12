import '/imports/startup/client/admin';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import 'typeface-roboto';

import { withTracker } from 'meteor/react-meteor-data';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from '/imports/ui/styles/theme';

import DocumentTitle from '/imports/ui/components/DocumentTitle';
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

  const component = userIsLoggedInAndAdmin ? children : <Login />;
  return (
    <ThemeProvider theme={theme}>
      <DocumentTitle />
      {component}
    </ThemeProvider>
  );
};

AdminLayout.propTypes = propTypes;

export default withTracker(() => {
  const isReady = Meteor.subscribe('users.loggedIn').ready();
  const userIsLoggedInAndAdmin = Meteor.userIsAdmin();

  return { isReady, userIsLoggedInAndAdmin };
})(AdminLayout);
