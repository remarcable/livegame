import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import { toggleAlias } from '/imports/api/alias/methods';

import ScoreboardList from '/imports/ui/components/ScoreboardList';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: better type
};

const EstimationGameRanking = ({ users }) => <ScoreboardList onClick={toggleAlias} users={users} />;

EstimationGameRanking.propTypes = propTypes;

export default withTracker(() => {
  const usersHandle = Meteor.subscribe('users.liveview.topTen');
  const users = Meteor.users
    .find(
      { role: { $ne: 'admin' }, estimationGame: { $exists: true } },
      {
        fields: {
          firstName: 1,
          lastName: 1,
          alias: 1,
          estimationGame: 1,
        },
        sort: {
          'estimationGame.rank': 1,
        },
        limit: 10,
      },
    )
    .fetch()
    .map((u) => ({
      _id: u._id,
      alias: u.alias,
      name: u.alias ? u.alias : `${u.firstName} ${u.lastName}`,
      rank: u.estimationGame.rank,
    }));

  return { users };
})(EstimationGameRanking);
