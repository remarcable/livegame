import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Star from './Star';

const propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      estimationGame: PropTypes.shape({
        gameNumber: PropTypes.number.isRequired,
      }),
      state: PropTypes.oneOf(['ACTIVE', 'CORRECT', 'WRONG', 'NOT_YET_PLAYED', 'SUBMITTED'])
        .isRequired,
    }),
  ).isRequired,
};

const ProgressSidebar = ({ classes, games }) => (
  <div className={classes.wrapper}>
    {games.map(({ fullShowGame: { gameNumber }, state }) => (
      <Star key={gameNumber} state={state} />
    ))}
  </div>
);

ProgressSidebar.propTypes = propTypes;

const styles = () => ({
  wrapper: {},
});

export default withStyles(styles)(ProgressSidebar);
