import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
};

class StatusIndicatorSymbol extends Component {
  state = { active: false };

  // This fixes a bug in Safari where the CSS animation wouldn't start when
  // directly mounted
  componentDidMount() {
    window.setTimeout(() => {
      this.setState(() => ({ active: true }));
    }, 1000);
  }

  render() {
    const { classes, status } = this.props;
    return (
      <div className={classes.wrapper}>
        <div
          className={classnames(classes.circle, classes.inner, {
            [classes.innerConnected]: status === 'connected',
            [classes.innerReconnecting]: ['connecting', 'waiting'].includes(status),
            [classes.innerOffline]: ['failed', 'offline'].includes(status),
          })}
        />
        {['connected', 'waiting', 'connecting'].includes(status) && (
          <div
            className={classnames(classes.circle, classes.activeAnimation, {
              [classes.animation]: this.state.active,
            })}
          />
        )}
      </div>
    );
  }
}

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
    transition: `all ${theme.transitions.duration.standard}ms`,
  },
  activeAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    opacity: 0,
  },
  animation: {
    animation: `pop-out 3s infinite ${theme.transitions.easing.easeInOut} .3s`,
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
