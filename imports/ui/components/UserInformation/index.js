import { Meteor } from 'meteor/meteor';
import { JoinClient } from 'meteor-publish-join';

import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import AppState from '/imports/api/appState/collection';
import { shouldDisplayRank } from '/imports/api/appState/rank-display-modes';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  ownRank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxRank: PropTypes.number,
  alias: PropTypes.string,
};

const UserInformation = ({ isReady, firstName, lastName, ownRank, maxRank, alias }) =>
  isReady ? (
    <div style={styles}>
      {/* If no ownRank is supplied, usw maxRank */}
      <span>
        {ownRank || maxRank} / {maxRank}
      </span>
      {alias ? (
        <span style={{ fontWeight: 300 }}>{alias}</span>
      ) : (
        <span style={{ fontWeight: 300 }}>
          {firstName} {lastName}
        </span>
      )}
      {alias && (
        <span style={aliasStyles}>
          {firstName} {lastName}
        </span>
      )}
    </div>
  ) : (
    <div>Lädt...</div>
  );

UserInformation.propTypes = propTypes;

const styles = {
  width: '100%',
  margin: 18,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  fontSize: '1.5em',
};

const aliasStyles = {
  marginTop: 12 / 2,
  fontWeight: 300,
  fontSize: '.5em',
};

export default withTracker(() => {
  const userHandle = Meteor.subscribe('users.loggedIn');
  const countsHandle = Meteor.subscribe('users.count');
  const maxRank = JoinClient.get('userCount');
  const isReady = userHandle.ready() && countsHandle.ready();
  const user = Meteor.user() || {};
  const { firstName, lastName, alias, rank } = user;

  const { rankDisplayMode } = AppState.findOne();
  const displayedRank = shouldDisplayRank(rank, rankDisplayMode) ? rank : 'XX';

  return {
    isReady,
    firstName,
    lastName,
    alias,
    ownRank: displayedRank,
    maxRank,
  };
})(UserInformation);
