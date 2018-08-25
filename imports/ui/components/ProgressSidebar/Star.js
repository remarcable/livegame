import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.oneOf(['ACTIVE', 'CORRECT', 'WRONG', 'NOT_YET_PLAYED', 'SUBMITTED']).isRequired,
};

const Star = ({ classes, state }) => <div className={classes.outer}>{state}</div>;

Star.propTypes = propTypes;

const styles = () => ({
  outer: {},
});

export default withStyles(styles)(Star);
