import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  state: PropTypes.oneOf(['ACTIVE', 'CORRECT', 'WRONG', 'NOT_YET_PLAYED', 'SUBMITTED']).isRequired,
};

const Star = ({ classes, state }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    className={classnames(classes[state], classes.base)}
  >
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
  </svg>
);

Star.propTypes = propTypes;

const styles = () => ({
  base: {
    filter: 'drop-shadow(0px 2px 9px #000)',
    stroke: 'transparent',
    strokeWidth: 1.5,
    transition: 'all .3s',
    willChange: 'fill, filter, stroke',
  },
  ACTIVE: {
    fill: '#F4CB44',
    filter: 'drop-shadow(0px 0px 12px #FFF)',
  },
  CORRECT: {
    fill: '#E9B60F',
  },
  WRONG: {
    fill: '#B1B1B1',
  },
  NOT_YET_PLAYED: {
    stroke: '#6C6C6C',
    fill: 'transparent',
  },
  SUBMITTED: {
    fill: '#7E630B',
  },
});

export default withStyles(styles)(Star);
