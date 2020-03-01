import '/imports/startup/client/admin';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import 'typeface-roboto';

import { withTracker } from 'meteor/react-meteor-data';
import { ThemeProvider } from '@material-ui/styles';

import ErrorBoundary from 'react-error-boundary';

import AppState from '/imports/api/appState/collection';
import { theme } from '/imports/ui/styles/theme';

import DocumentTitle from '/imports/ui/components/DocumentTitle';
import Login from '/imports/ui/Pages/Admin/Login';
import Onboarding from '/imports/ui/Pages/Admin/Onboarding';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  shouldShowOnboarding: PropTypes.bool.isRequired,
  userIsLoggedInAndAdmin: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const AdminLayout = ({ children, isReady, shouldShowOnboarding, userIsLoggedInAndAdmin }) => {
  if (!isReady) {
    return null;
  }

  const component = userIsLoggedInAndAdmin ? children : <Login />;
  const componentWithOnboarding = shouldShowOnboarding ? <Onboarding /> : component;

  return (
    <ErrorBoundary onError={console.log}>
      <ThemeProvider theme={theme}>
        <DocumentTitle />
        {componentWithOnboarding}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

AdminLayout.propTypes = propTypes;

export default withTracker(() => {
  const appStateHandle = Meteor.subscribe('appState');
  const isReady = Meteor.subscribe('users.loggedIn').ready() && appStateHandle.ready();
  const userIsLoggedInAndAdmin = Meteor.userIsAdmin();

  return {
    isReady,
    shouldShowOnboarding: isReady && !AppState.findOne(),
    userIsLoggedInAndAdmin,
  };
})(AdminLayout);
