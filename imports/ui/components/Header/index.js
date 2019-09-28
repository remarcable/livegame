import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classnames from 'classnames';

import { useWindowHeight } from '@react-hook/window-size';
import { withStyles } from '@material-ui/styles';

import Logo from '../Logo';
import Headline from '../Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isEstimationGame: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

const Header = ({ classes, title, isEstimationGame }) => {
  const currentClientHeight = useWindowHeight();
  const isSmallScreen = currentClientHeight < 600;

  return (
    <div className={classnames(classes.header, { [classes.small]: isSmallScreen })}>
      <div
        className={classnames(classes.estimationGameHeader, { [classes.active]: isEstimationGame })}
      />
      <div className={classnames(classes.logoWrapper, { [classes.small]: isSmallScreen })}>
        <Logo classes={{ wrapper: classnames({ [classes.smallLogo]: isSmallScreen }) }} />
      </div>
      <div className={classes.titleWrapper}>
        <ReactCSSTransitionReplace
          transitionName="fade-up"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <h2 className={classes.title} key={title}>
            <Headline>{title}</Headline>
          </h2>
        </ReactCSSTransitionReplace>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;

const styles = (theme) => ({
  header: {
    position: 'relative',
    width: '100%',
    height: 200,
    paddingTop: 20,
    marginBottom: 20,

    textTransform: 'uppercase',
    textAlign: 'center',

    '&$small': {
      height: 'auto',
      paddingBottom: 10,
    },
  },
  estimationGameHeader: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(#FFB13D 0%, #CD790C 100%)',
    opacity: 0,
    transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    '&$active': {
      opacity: 1,
    },
  },
  active: {},
  smallLogo: {
    height: 40,
    width: 40,
    minHeight: 40,
    minWidth: 40,
  },
  logoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,

    '&$small': {
      position: 'fixed',
      left: 4,
      top: 10,
      width: 'auto',
      marginBottom: 0,
    },
  },
  titleWrapper: {
    display: 'block',
  },
  title: {
    fontSize: 20,
    margin: '0 20px',
  },
  small: {},
});

export default withStyles(styles)(Header);
