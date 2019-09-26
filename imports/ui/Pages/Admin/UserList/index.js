import { Meteor } from 'meteor/meteor';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { JoinClient } from 'meteor-publish-join';

import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import sumFromIndexToEnd from '/imports/api/helpers/sumFromIndexToEnd';

import DocumentTitle from '/imports/ui/components/DocumentTitle';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.array.isRequired, // TODO: better type
  minRank: PropTypes.number.isRequired,
  maxRank: PropTypes.number.isRequired,
  minPoints: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
};

const tablePropTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.array.isRequired,
};

const UserListPage = ({ classes, users = [], minRank, maxRank, minPoints, maxPoints }) => (
  <>
    <DocumentTitle>Spielerliste</DocumentTitle>
    <div className={classes.wrapper}>
      <div className={classes.text}>
        <h1>Teilnehmer</h1>
        <div className={classes.rankText}>
          Rang von {minRank} bis {maxRank}. Punkte von {minPoints} bis {maxPoints}.
        </div>
      </div>
      <StyledUserTable users={users} />
    </div>
  </>
);

class UserTable extends PureComponent {
  constructor() {
    super();
    this.state = {
      sortBy: 'fullShowRank',
    };
  }

  setSortType = (type) => {
    this.setState(() => ({ sortBy: type }));
  };

  render() {
    const { users, classes } = this.props;
    const { sortBy } = this.state;

    const sortedUsers = users.sort((a, b) => {
      if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
        return a[sortBy].localeCompare(b[sortBy]);
      }

      return a[sortBy] - b[sortBy];
    });

    return (
      <Paper className={classes.wrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => this.setSortType('fullShowRank')}>
                Full Show Rang (Punkte)
              </TableCell>
              <TableCell onClick={() => this.setSortType('estimationGameRank')}>
                Schätzen Rang (Punkte)
              </TableCell>
              <TableCell onClick={() => this.setSortType('_id')}>ID</TableCell>
              <TableCell onClick={() => this.setSortType('firstName')}>Vorname</TableCell>
              <TableCell onClick={() => this.setSortType('lastName')}>Nachname</TableCell>
              <TableCell onClick={() => this.setSortType('alias')}>Alias</TableCell>
              <TableCell onClick={() => this.setSortType('email')}>E-Mail</TableCell>
              <TableCell onClick={() => this.setSortType('newsletter')}>Newsletter</TableCell>
              <TableCell onClick={() => this.setSortType('flags')}>Flags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((u) => (
              <TableRow key={u._id}>
                <TableCell>
                  {u.fullShowRank} ({u.fullShowScore})
                </TableCell>
                <TableCell>
                  {(u.estimationGame && u.estimationGame.rank) || '-'} (
                  {(u.estimationGame && u.estimationGame.points) || '-'})
                </TableCell>
                <TableCell>{u._id}</TableCell>
                <TableCell>{u.firstName}</TableCell>
                <TableCell>{u.lastName}</TableCell>
                <TableCell>{u.alias || '-'}</TableCell>
                <TableCell>{u.email || '-'}</TableCell>
                <TableCell>{u.newsletter ? '✓' : '✕'}</TableCell>
                <TableCell>{u.flags ? Object.keys(u.flags).join(', ') : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UserListPage.propTypes = propTypes;
UserTable.propTypes = tablePropTypes;

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    width: '80%',
  },
};

const userTableStyles = {
  wrapper: {
    maxWidth: '80%',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    overflow: 'scroll',
  },
  table: {
    width: '100%',
  },
};

const StyledUserTable = withStyles(userTableStyles)(UserTable);

export default withTracker(() => {
  const userHandle = Meteor.subscribe('users.all');
  const userCountHandle = Meteor.subscribe('users.count');

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
      .filter((u) => u.username === undefined) // filter out admins
      .map((u) => {
        const fullShowScore = correctUserSubmissionsCountsMap.get(u._id);
        return {
          ...u,
          fullShowScore,
          fullShowRank: sumFromIndexToEnd(fullShowScore, userRanking) + 1,
          estimationGameRank: (u.estimationGame && u.estimationGame.rank) || -1,
          newsletter: u.newsletter || !!(u.flags && u.flags.newsletter),
        };
      }) || [];

  const maxRank = Math.max(...users.map((u) => u.estimationGame && u.estimationGame.rank)) || 0;
  const minRank = Math.min(...users.map((u) => u.estimationGame && u.estimationGame.rank)) || 0;

  const maxPoints = Math.max(...users.map((u) => u.estimationGame && u.estimationGame.points)) || 0;
  const minPoints = Math.min(...users.map((u) => u.estimationGame && u.estimationGame.points)) || 0;

  return {
    maxRank,
    minRank,
    maxPoints,
    minPoints,
    users,
  };
})(withStyles(styles)(UserListPage));
