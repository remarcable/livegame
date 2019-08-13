import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/styles';

import Headline from '/imports/ui/components/Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: better type
  onClick: PropTypes.func.isRequired,
};

const ScoreboardList = ({ classes, users, onClick }) => (
  <div className={classes.wrapper}>
    {users.map((user) => (
      <div
        key={user._id}
        className={classnames(classes.userRank, {
          [classes.firstRanks]: user.rank <= 3 && user.rank >= 2,
          [classes.veryFirstRank]: user.rank === 1,
          [classes.withAlias]: !!user.alias,
        })}
        onClick={() => onClick({ user })}
      >
        <Headline className={classes.userRankText}>
          {user.rank}. {user.name}
        </Headline>
      </div>
    ))}
  </div>
);

ScoreboardList.propTypes = propTypes;

const styles = (theme) => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userRankText: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: 10,
  },
  userRank: {
    width: '100%',
    maxWidth: '50%',
    textAlign: 'left',
    margin: 10,
    fontSize: 24,
    backgroundImage: 'linear-gradient(#4b4d5b 0%, #31333e 100%)',
    borderRadius: 3,
    boxShadow: theme.shadows[10],
    '&$veryFirstRank': {
      backgroundImage: 'linear-gradient(#F4CB44 0%, #CD790C 100%)',
    },
    '&$firstRanks': {
      backgroundImage: 'linear-gradient(#FFB13D 0%, #CD790C 100%)',
    },
  },
  withAlias: {
    fontStyle: 'italic',
  },
  veryFirstRank: {},
  firstRanks: {},
});

export default withStyles(styles)(ScoreboardList);
