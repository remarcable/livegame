import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { JoinClient } from 'meteor-publish-join';

import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';

import sumFromIndexToEnd from '/imports/api/helpers/sumFromIndexToEnd';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.array.isRequired, // TODO: better type
  minRank: PropTypes.number.isRequired,
  maxRank: PropTypes.number.isRequired,
  minPoints: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
};

const tablePropTypes = {
  users: PropTypes.array.isRequired,
};

const UserListPage = ({ classes, users = [], minRank, maxRank, minPoints, maxPoints }) => (
  <AdminLayout>
    <div className={classes.wrapper}>
      <h2>Teilnehmer</h2>
      {users.length ? (
        <div className={classes.wrapper}>
          <span>
            Rang von {minRank} bis {maxRank}. Punkte von {minPoints} bis {maxPoints}.
          </span>
          <div className={classes.tableWrapper}>
            <UserTable users={users} />
          </div>
        </div>
      ) : (
        <span>Keine Nutzer</span>
      )}
    </div>
  </AdminLayout>
);

const UserTable = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th>Vorname</th>
        <th>Nachname</th>
        <th>Alias</th>
        <th>E-Mail</th>
        <th>ID</th>
        <th>Schätzen Rang</th>
        <th>Schätzen Punkte</th>
        <th>Full Show Rang</th>
        <th>Full Show Score</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u._id}>
          <td>{u.firstName}</td>
          <td>{u.lastName}</td>
          <td>{u.alias || '-'}</td>
          <td>{u.email || '-'}</td>
          <td>{u._id}</td>
          <td>{u.points || '-'}</td>
          <td>{u.rank || '-'}</td>
          <td>{u.fullShowRank}</td>
          <td>{u.fullShowScore}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

UserListPage.propTypes = propTypes;
UserTable.propTypes = tablePropTypes;

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableWrapper: {
    width: '80%',
    marginTop: 20,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

export default withTracker(() => {
  const userHandle = Meteor.subscribe('users.all');
  const userCountHandle = Meteor.subscribe('users.count');

  const correctUserSubmissionsCounts = JoinClient.get('userRanks') || [];
  const correctUserSubmissionsCountsMap = new Map();

  const userRanking = JoinClient.get('userRankCounts') || [];

  correctUserSubmissionsCounts.forEach(({ _id: userId, correctSubmissions: score }) => {
    correctUserSubmissionsCountsMap.set(userId, score);
  });

  // TODO: sort table by what you want
  const users =
    Meteor.users
      .find({ role: { $ne: 'admin' } })
      .fetch()
      .filter((u) => u.username === undefined) // filter out admins
      .map((u) => {
        const fullShowScore = correctUserSubmissionsCountsMap.get(u._id);
        return {
          ...u,
          fullShowScore,
          fullShowRank: sumFromIndexToEnd(fullShowScore, userRanking) + 1,
        };
      })
      .sort((a, b) => a.fullShowRank - b.fullShowRank) || [];

  const maxRank = Math.max(...users.map((u) => u.rank)) || 0;
  const minRank = Math.min(...users.map((u) => u.rank)) || 0;

  const maxPoints = Math.max(...users.map((u) => u.points)) || 0;
  const minPoints = Math.min(...users.map((u) => u.points)) || 0;

  return {
    maxRank,
    minRank,
    maxPoints,
    minPoints,
    users,
  };
})(withStyles(styles)(UserListPage));
