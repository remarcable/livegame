import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { useWindowHeight } from '@react-hook/window-size';

import classnames from 'classnames';

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
  isAdminPreview: PropTypes.bool.isRequired,
};

const ScoreSidebar = ({ classes, games, isAdminPreview }) => {
  // TODO create isSmallScreen hook
  const currentClientHeight = useWindowHeight();
  const isSmallScreen = currentClientHeight < 600;

  const correctGamesCount = games.filter((g) => g.state === 'CORRECT').length;
  return (
    <div
      className={classnames(classes.outerWrapper, {
        [classes.adminPreview]: isAdminPreview,
      })}
    >
      <div className={classnames(classes.wrapper, { [classes.small]: isSmallScreen })}>
        {games.map(({ fullShowGame: { gameNumber }, state }) => (
          <Star
            key={gameNumber}
            state={state}
            classes={{ wrapper: classnames({ [classes.small]: isSmallScreen }) }}
          />
        ))}

        <div className={classes.scoreText}>
          <span className={classes.score}>{correctGamesCount}</span>
          <span className={classes.scoreDescription}>
            {correctGamesCount === 1 ? 'Punkt' : 'Punkte'}
          </span>
        </div>
      </div>
    </div>
  );
};

ScoreSidebar.propTypes = propTypes;

// TODO: use theme variable
const width = 50;
const styles = () => ({
  outerWrapper: {
    position: 'fixed',
    width,
    minWidth: width,
    height: '100%',
    overflowY: 'scroll',

    backgroundColor: '#0f172a',
    color: '#ddd',

    textAlign: 'center',
    textTransform: 'uppercase',

    boxShadow: 'inset -13px 0px 17px -8px rgba(0, 0, 0, .5)',
  },
  adminPreview: { position: 'absolute' },
  wrapper: {
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&$small': {
      position: 'relative',
      height: '100%',
    },
  },
  scoreText: {
    position: 'absolute',
    left: 0,
    bottom: 10,

    width,

    display: 'flex',
    flexDirection: 'column',
  },
  score: {
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    fontSize: 25,
  },
  scoreDescription: {
    fontSize: 10,
  },
  small: {
    marginTop: 0,
    marginBottom: 0,
  },
});

export default withStyles(styles)(ScoreSidebar);
