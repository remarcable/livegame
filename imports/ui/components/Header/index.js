import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classnames from 'classnames';

import { withStyles } from '@material-ui/styles';

import Logo from '../Logo';
import Headline from '../Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  userIsSelectedAsParticipantForCurrentGame: PropTypes.bool.isRequired,
};

const Header = ({ classes, title, userIsSelectedAsParticipantForCurrentGame }) => {
  return (
    <div
      className={classnames(classes.header, {
        [classes.userWasSelected]: userIsSelectedAsParticipantForCurrentGame,
      })}
    >
      <div className={classes.logoWrapper}>
        <Logo />
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

        {userIsSelectedAsParticipantForCurrentGame && (
          <h2 className={classnames(classes.title, classes.candidateTitle)} key="candidate">
            <Headline>Sie wurden als Kandidat ausgewählt.</Headline>
          </h2>
        )}
      </div>
    </div>
  );
};

Header.propTypes = propTypes;

const styles = (theme) => ({
  header: {
    position: 'relative',
    width: '100%',
    height: 225,
    paddingTop: 20,
    marginBottom: 20,

    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundImage: 'none',
    transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
  },
  userWasSelected: {
    height: 275,
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    backgroundImage: 'linear-gradient(#FFB13D 0%, #CD790C 100%)',
  },
  active: {},
  logoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
  },
  titleWrapper: {
    display: 'block',
  },
  title: {
    fontSize: 20,
    margin: '0 20px',
  },
  candidateTitle: {
    marginTop: 24,
  },
});

export default withStyles(styles)(Header);
