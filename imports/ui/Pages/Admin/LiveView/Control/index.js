import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
};

const LiveViewControl = ({ isReady }) => (
  <AdminLayout>
    <span>
      LiveViewControl:
      {isReady ? ' ready' : ''}
    </span>
  </AdminLayout>
);

LiveViewControl.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.scoreboard');
  const isReady = interactionsHandle.ready();
  return { isReady };
})(LiveViewControl);
