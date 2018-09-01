import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FullShowWaiting from '../FullShowWaiting';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
};

const FullShowGame = ({ hasSubmitted, classes }) => {
  if (hasSubmitted) {
    return <FullShowWaiting />;
  }

  return <span className={classes.text}>Wer gewinnt dieses Spiel?</span>;
};

FullShowGame.propTypes = propTypes;

const styles = {
  text: {
    display: 'block',
    marginTop: 50,
    width: '100%',
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};

export default withStyles(styles)(FullShowGame);
