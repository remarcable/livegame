import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import { withStyles } from '@material-ui/core/styles';

import Logo from '../Logo';
import Headline from '../Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string,
};

const Header = ({ classes, title }) => (
  <div className={classes.header}>
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
    </div>
  </div>
);

Header.propTypes = propTypes;

const styles = {
  header: {
    width: '100%',
    height: 200,
    paddingTop: 50,

    textTransform: 'uppercase',
    textAlign: 'center',
  },
  logoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleWrapper: {
    display: 'block',
  },
  title: {
    fontSize: 20,
    margin: 0,
  },
};

export default withStyles(styles)(Header);
