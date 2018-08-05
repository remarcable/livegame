import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import Registration from '/imports/ui/Pages/LiveGame/Registration';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const PlayerLayout = ({ children, isReady, loggedIn }) => {
  if (!isReady) {
    return null;
  }

  if (!loggedIn) {
    return <Registration />;
  }

  return children;
};

PlayerLayout.propTypes = propTypes;

export default withTracker(() => {
  const isReady = Meteor.subscribe('users.loggedIn').ready();
  const loggedIn = !!Meteor.userId();

  return { isReady, loggedIn };
})(PlayerLayout);
