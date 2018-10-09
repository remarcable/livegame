import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { JoinClient } from 'meteor-publish-join';
import { withTracker } from 'meteor/react-meteor-data';

import AppState from '/imports/api/appState/collection';

import { toggleAlias } from '/imports/api/alias/methods';
import sumFromIndexToEnd from '/imports/api/helpers/sumFromIndexToEnd';
import xStringForString from '/imports/api/helpers/xStringForString';
import { shouldDisplayRank } from '/imports/api/appState/rank-display-modes';

import ScoreboardList from '/imports/ui/components/ScoreboardList';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: better type
};

const FullShowGameRanking = ({ users }) => <ScoreboardList onClick={toggleAlias} users={users} />;
FullShowGameRanking.propTypes = propTypes;

export default withTracker(() => {
  const userRankCounts = JoinClient.get('userRankCounts') || [];
  const userRanks = (JoinClient.get('userRanks') || [])
    .sort((a, b) => b.correctSubmissions - a.correctSubmissions)
    .filter((el, i) => i < 10)
    .map((u) => ({
      _id: u._id,
      rank: sumFromIndexToEnd(u.correctSubmissions, userRankCounts) + 1,
      s: u.correctSubmissions,
    }));

  const userIds = userRanks.map((u) => u._id);
  const appStateHandle = Meteor.subscribe('appState');
  const usersHandle = Meteor.subscribe('users.fullShowGameRanks', userIds);
  const usersHandle2 = Meteor.subscribe('users.count');
  const usersHandle3 = Meteor.subscribe('users.loggedIn');

  const { rankDisplayMode = 'ALL' } = AppState.findOne() || {};

  const users = Meteor.users
    .find({ role: { $ne: 'admin' } })
    .fetch()
    .map((user) => {
      const { rank = 0 } = userRanks.find((u) => u._id === user._id) || {};
      const displayRank = shouldDisplayRank(rank, rankDisplayMode);

      const name = user.alias ? user.alias : `${user.firstName} ${user.lastName}`;
      return {
        _id: user._id,
        alias: user.alias,
        name: displayRank ? name : xStringForString(name),
        rank,
      };
    })
    .sort((a, b) => a.rank - b.rank);

  return { users };
})(FullShowGameRanking);
