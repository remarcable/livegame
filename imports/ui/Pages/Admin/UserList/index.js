import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { JoinClient } from 'meteor-publish-join';

import { Helmet } from 'react-helmet';

import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/styles';

import sumFromIndexToEnd from '/imports/api/helpers/sumFromIndexToEnd';
import { getAllFlagNames } from '/imports/api/helpers/getAllFlagNames';

import DocumentTitle from '/imports/ui/components/DocumentTitle';
import UserTable from './UserTable';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.array.isRequired, // TODO: better type
  flagNames: PropTypes.array.isRequired, // TODO: better type
  isReady: PropTypes.bool.isRequired,
};

const UserListPage = ({ classes, users = [], flagNames = [], isReady }) => (
  <>
    <DocumentTitle>Spielerliste</DocumentTitle>
    <Helmet>
      <style>{`
        html {
            user-select: initial !important;
            -webkit-user-select: initial !important;
        }

        * {
            user-select: initial !important;
        }
    `}</style>
    </Helmet>

    <div className={classes.wrapper}>
      <UserTable isLoading={!isReady} users={users} flagNames={flagNames} />
    </div>
  </>
);

UserListPage.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default withTracker(() => {
  const allUsersHandle = Meteor.subscribe('users.all');
  const userCountHandle = Meteor.subscribe('users.count');

  const isReady = allUsersHandle.ready() && userCountHandle.ready();

  const correctUserSubmissionsCounts = JoinClient.get('userRanks') || [];
  const correctUserSubmissionsCountsMap = new Map();

  const userRanking = JoinClient.get('userRankCounts') || [];

  correctUserSubmissionsCounts.forEach(({ _id: userId, correctSubmissions: score }) => {
    correctUserSubmissionsCountsMap.set(userId, score);
  });

  const users =
    Meteor.users
      .find({ role: { $ne: 'admin' } })
      .fetch()
      .filter((u) => u.username === undefined) // don't show admin users
      .map((u) => {
        const fullShowScore = correctUserSubmissionsCountsMap.get(u._id);
        return {
          ...u,
          fullShowScore,
          fullShowRank: sumFromIndexToEnd(fullShowScore, userRanking) + 1,
          newsletter: u.newsletter || !!(u.flags && u.flags.newsletter),
        };
      }) || [];

  const flagNames = getAllFlagNames(users).filter((flagName) => flagName !== 'newsletter');

  return { flagNames, users, isReady };
})(withStyles(styles)(UserListPage));
