import { Meteor } from 'meteor/meteor';
import { JoinClient } from 'meteor-publish-join';

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import { withTracker } from 'meteor/react-meteor-data';

import Divider from '@material-ui/core/Divider';

import AppState from '/imports/api/appState/collection';
import { shouldDisplayRank } from '/imports/api/appState/rank-display-modes';

import AnimatedNumber from '/imports/ui/components/AnimatedNumber';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isReady: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  ownRank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxRank: PropTypes.number,
  alias: PropTypes.string,
  fullShow: PropTypes.bool,
};

const UserInformation = ({
  fullShow = false,
  classes,
  isReady,
  firstName,
  lastName,
  ownRank,
  maxRank,
  alias,
}) => {
  if (!isReady) {
    return <div>Lädt...</div>;
  }

  const withAlias = (
    <>
      <span>{alias}</span>
      <span className={classes.alias}>
        {firstName} {lastName}
      </span>
    </>
  );

  const withoutAlias = (
    <span>
      {firstName} {lastName}
    </span>
  );

  // If no ownRank is supplied, usw maxRank
  const rank = ownRank || maxRank;
  return (
    <div className={classes.wrapper}>
      <span>
        {!fullShow && (
          <>
            <AnimatedNumber value={rank} /> / <AnimatedNumber value={maxRank} />
          </>
        )}
      </span>
      {!fullShow && <span className={classes.alias}>Rang für Schätzen</span>}
      <Divider className={classes.divider} />
      {alias ? withAlias : withoutAlias}
    </div>
  );
};

UserInformation.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '100%',
    margin: 18,
    marginTop: 25,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    fontSize: 18,
  },
  divider: {
    width: '80%',
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
  },
  alias: {
    marginTop: 6,
    fontWeight: 300,
    fontSize: 12,
  },
};

export default withTracker(() => {
  const appStateHandle = Meteor.subscribe('appState');
  const userHandle = Meteor.subscribe('users.loggedIn');
  const countsHandle = Meteor.subscribe('users.count');
  const maxRank = JoinClient.get('userCount') || 1;
  const isReady = appStateHandle.ready() && userHandle.ready() && countsHandle.ready();

  const user = Meteor.user() || {};
  const { firstName, lastName, alias, estimationGame: { rank } = {} } = user;

  const { rankDisplayMode = 'ALL' } = AppState.findOne() || {};
  const displayedRank = shouldDisplayRank(rank, rankDisplayMode) ? rank : 'XX';

  return {
    isReady,
    firstName,
    lastName,
    alias,
    ownRank: displayedRank,
    maxRank,
  };
})(withStyles(styles)(UserInformation));
