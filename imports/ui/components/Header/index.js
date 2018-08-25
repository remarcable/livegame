import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Logo from '../Logo';
import Headline from '../Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string,
};

const Header = ({ classes, title }) => (
  <div className={classes.header}>
    <Logo />
    {title && (
      <h2 className={classes.title}>
        <Headline>{title}</Headline>
      </h2>
    )}
  </div>
);

Header.propTypes = propTypes;

const styles = {
  header: {
    width: '100%',
    height: 200,
    paddingTop: 50,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
  },
};

export default withStyles(styles)(Header);
