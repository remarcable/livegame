import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/styles';

import StatusIndicatorSymbol from './StatusIndicatorSymbol';

const propTypes = {
  status: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const statusTexts = {
  connected: 'Verbunden',
  connecting: 'Verbindet...',
  failed: 'Verbindung verloren',
  waiting: 'Verbindet...',
  offline: 'Offline',
};

const ConnectionStatus = ({ classes, status }) => (
  <div className={classes.wrapper}>
    <StatusIndicatorSymbol status={status} />
    <span className={classes.text}>{statusTexts[status]}</span>
  </div>
);

ConnectionStatus.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 3,
    transform: 'translateY(5%)',

    fontSize: 16,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
};

export default withTracker(() => {
  const { status } = Meteor.status();
  return { status };
})(withStyles(styles)(ConnectionStatus));
