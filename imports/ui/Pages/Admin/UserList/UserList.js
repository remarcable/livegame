import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const propTypes = {
  users: PropTypes.array.isRequired,
  minRank: PropTypes.number.isRequired,
  maxRank: PropTypes.number.isRequired,
  minPoints: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  isReady: PropTypes.bool.isRequired,
};

const tablePropTypes = {
  users: PropTypes.array.isRequired,
};

const UserListPage = ({ users, minRank, maxRank, minPoints, maxPoints, isReady }) => (
  <AdminLayout>
    <div style={styles}>
      <h2>Teilnehmer</h2>
      {users.length ? (
        <div style={styles}>
          <span>
            Rang von {minRank} bis {maxRank}. Punkte von {minPoints} bis {maxPoints}.
          </span>
          <Paper zDepth={2} style={paperStyles}>
            {isReady && <UserTable users={users} />}
          </Paper>
        </div>
      ) : (
        <span>Keine Nutzer</span>
      )}
    </div>
  </AdminLayout>
);

const UserTable = ({ users }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Rang</TableHeaderColumn>
        <TableHeaderColumn>Vorname</TableHeaderColumn>
        <TableHeaderColumn>Nachname</TableHeaderColumn>
        <TableHeaderColumn>Alias</TableHeaderColumn>
        <TableHeaderColumn>E-Mail</TableHeaderColumn>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Punkte</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {users.map((u) => (
        <TableRow key={u._id}>
          <TableRowColumn>{u.rank || '-'}</TableRowColumn>
          <TableRowColumn>{u.firstName}</TableRowColumn>
          <TableRowColumn>{u.lastName}</TableRowColumn>
          <TableRowColumn>{u.alias || '-'}</TableRowColumn>
          <TableRowColumn>{u.email || '-'}</TableRowColumn>
          <TableRowColumn>{u._id}</TableRowColumn>
          <TableRowColumn>{u.points || '-'}</TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

UserListPage.propTypes = propTypes;
UserTable.propTypes = tablePropTypes;

const styles = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const paperStyles = {
  width: '80%',
  marginTop: 20,
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default withTracker(() => {
  const userHandle = Meteor.subscribe('users.all');

  const isReady = userHandle.ready();
  const users =
    Meteor.users
      .find({ role: { $ne: 'admin' } })
      .fetch()
      .filter((u) => u.username === undefined) || []; // filter out admins

  const maxRank = Math.max(...users.map((u) => u.rank)) || 0;
  const minRank = Math.min(...users.map((u) => u.rank)) || 0;

  const maxPoints = Math.max(...users.map((u) => u.points)) || 0;
  const minPoints = Math.min(...users.map((u) => u.points)) || 0;

  return {
    isReady,
    maxRank,
    minRank,
    maxPoints,
    minPoints,
    users,
  };
})(UserListPage);
