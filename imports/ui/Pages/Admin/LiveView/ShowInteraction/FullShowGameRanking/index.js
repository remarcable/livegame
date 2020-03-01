import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { JoinClient } from 'meteor-publish-join';
import { withTracker } from 'meteor/react-meteor-data';

import AppState from '/imports/api/appState/collection';

import { toggleAlias } from '/imports/api/alias/methods';
// import sumFromIndexToEnd from '/imports/api/helpers/sumFromIndexToEnd';
import xStringForString from '/imports/api/helpers/xStringForString';
import { shouldDisplayRank } from '/imports/api/appState/rank-display-modes';

import ScoreboardList from '/imports/ui/components/ScoreboardList';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: better type
};

const FullShowGameRanking = ({ users }) => <ScoreboardList onClick={toggleAlias} users={users} />;
FullShowGameRanking.propTypes = propTypes;

export default withTracker(() => {
  // const userRankCounts = JoinClient.get('userRankCounts') || [];
  const userRanks = (JoinClient.get('userRanks') || [])
    .sort((a, b) => b.correctSubmissions - a.correctSubmissions)
    .slice(0, 10)
    .map((u, i) => ({
      _id: u._id,
      // XXX: Even though the commented out line is more correct
      // for the show it is much more practical to have an absolute ranking
      // rank: sumFromIndexToEnd(u.correctSubmissions, userRankCounts) + 1,
      rank: i + 1,
      s: u.correctSubmissions,
    }));

  const userIds = userRanks.map((u) => u._id);

  Meteor.subscribe('appState');
  Meteor.subscribe('users.fullShowGameRanks', userIds);
  Meteor.subscribe('users.count');
  Meteor.subscribe('users.loggedIn');

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
