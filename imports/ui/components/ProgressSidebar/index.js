import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Star from './Star';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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

const ProgressSidebar = ({ classes, games }) => {
  const correctGamesCount = games.filter((g) => g.state === 'CORRECT').length;
  return (
    <div className={classes.wrapper}>
      {games.map(({ fullShowGame: { gameNumber }, state }) => (
        <Star key={gameNumber} state={state} />
      ))}

      <div className={classes.scoreText}>
        <span className={classes.score}>{correctGamesCount}</span>
        <span className={classes.scoreDescription}>
          {correctGamesCount === 1 ? 'Punkt' : 'Punkte'}
        </span>
      </div>
    </div>
  );
};

ProgressSidebar.propTypes = propTypes;

// TODO: use theme variable
const styles = () => ({
  wrapper: {
    position: 'relative',
    width: 50,
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#232D33',
    color: '#ddd',

    textAlign: 'center',
    textTransform: 'uppercase',

    boxShadow: 'inset -13px 0px 17px -8px rgba(0, 0, 0, .5)',
  },
  scoreText: {
    position: 'absolute',
    left: 0,
    bottom: 10,

    width: 50,

    display: 'flex',
    flexDirection: 'column',
  },
  score: {
    fontFamily: 'GothamBold',
    fontSize: 25,
  },
  scoreDescription: {
    fontSize: 10,
  },
});

export default withStyles(styles)(ProgressSidebar);
