import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const propTypes = {
  users: PropTypes.array.isRequired,
  isReady: PropTypes.bool.isRequired,
};

const tablePropTypes = {
  users: PropTypes.array.isRequired,
};

const UserListPage = ({
  users,
  isReady,
}) => (
  <div style={styles}>
    <h2>Teilnehmer</h2>
    <Paper zDepth={2} style={paperStyles}>
      {isReady && <UserTable users={users} />}
    </Paper>
  </div>
);

const UserTable = ({ users }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Vorname</TableHeaderColumn>
        <TableHeaderColumn>Nachname</TableHeaderColumn>
        <TableHeaderColumn>Alias</TableHeaderColumn>
        <TableHeaderColumn>ID</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {users.map(u => (
        <TableRow key={u._id}>
          <TableRowColumn>{u.rank || '-'}</TableRowColumn>
          <TableRowColumn>{u.firstName}</TableRowColumn>
          <TableRowColumn>{u.lastName}</TableRowColumn>
          <TableRowColumn>{u.alias || '-'}</TableRowColumn>
          <TableRowColumn>{u._id}</TableRowColumn>
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

export default createContainer(() => {
  const userHandle = Meteor.subscribe('users.all');

  const isReady = userHandle.ready();
  const users = Meteor.users
    .find({ role: { $ne: 'admin' } })
    .fetch()
    .filter(u => u.username === undefined) || []; // filter out admins

  return { isReady, users };
}, UserListPage);
