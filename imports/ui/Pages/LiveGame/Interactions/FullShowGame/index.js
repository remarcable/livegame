import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const FullShowGame = ({ classes }) => (
  <span className={classes.text}>Wer gewinnt dieses Spiel?</span>
);

FullShowGame.propTypes = propTypes;

const styles = {
  text: {
    display: 'block',
    paddingTop: 50,
    width: '100%',
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};

export default withStyles(styles)(FullShowGame);
