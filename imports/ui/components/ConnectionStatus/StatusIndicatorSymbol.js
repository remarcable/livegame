import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
};

const StatusIndicatorSymbol = ({ classes, status }) => (
  <div className={classes.wrapper}>
    <div
      className={classnames(classes.circle, classes.inner, {
        [classes.innerConnected]: status === 'connected',
        [classes.innerReconnecting]: ['connecting', 'waiting'].includes(status),
        [classes.innerOffline]: ['failed', 'offline'].includes(status),
      })}
    />
    {['connected', 'waiting', 'connecting'].includes(status) && (
      <div className={classnames(classes.circle, classes.activeAnimation)} />
    )}
  </div>
);

StatusIndicatorSymbol.propTypes = propTypes;

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
  },
  circle: {
    margin: 5,
    width: 15,
    height: 15,
    minWidth: 15,
    minHeight: 15,
    borderRadius: '50%',
    transition: 'all .3s',
  },
  activeAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    animation: 'pop-out 3s infinite cubic-bezier(0.23, 1, 0.32, 1)',
  },
  inner: {
    backgroundColor: 'white',
    boxShadow: theme.shadows[10],
    '&$innerConnected': {
      backgroundColor: '#287DED',
    },
    '&$innerReconnecting': {
      backgroundColor: '#FF9800',
    },
    '&$innerOffline': {
      backgroundColor: '#FF3D00',
    },
  },
  innerConnected: {},
  innerReconnecting: {},
  innerOffline: {},
});

export default withStyles(styles)(StatusIndicatorSymbol);
