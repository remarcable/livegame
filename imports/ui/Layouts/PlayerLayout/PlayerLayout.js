import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import Loading from '/imports/ui/components/Loading';
import Onboarding from '/imports/ui/Pages/LiveGame/Onboarding';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const PlayerLayout = ({ children, isReady, loggedIn, loading }) => {
  if (!isReady && loading) {
    return <Loading />;
  }

  if (!loggedIn) {
    return <Onboarding />;
  }

  return children;
};

PlayerLayout.propTypes = propTypes;

export default withTracker(() => {
  const isReady = Meteor.subscribe('users.loggedIn').ready();
  const loggedIn = !!Meteor.userId();

  return { isReady, loggedIn };
})(PlayerLayout);
