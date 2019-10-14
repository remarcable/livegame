import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.array.isRequired,
  flagNames: PropTypes.array.isRequired, // TODO: better type
};

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
    const { users, flagNames, classes } = this.props;
    const { sortBy } = this.state;

    const sortedUsers = users.sort((a, b) => {
      if (sortBy.includes('flags')) {
        const flag = sortBy.split('flags-')[1];
        const userAFlagValue = (a.flags && a.flags[flag]) || false;
        const userBFlagValue = (b.flags && b.flags[flag]) || false;

        return +userBFlagValue - +userAFlagValue;
      }

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
              <TableCell onClick={() => this.setSortType('_id')}>ID</TableCell>
              <TableCell onClick={() => this.setSortType('firstName')}>Vorname</TableCell>
              <TableCell onClick={() => this.setSortType('lastName')}>Nachname</TableCell>
              <TableCell onClick={() => this.setSortType('alias')}>Alias</TableCell>
              <TableCell onClick={() => this.setSortType('email')}>E-Mail</TableCell>
              <TableCell onClick={() => this.setSortType('newsletter')}>Newsletter</TableCell>
              <TableCell onClick={() => this.setSortType('fullShowRank')}>Full Show Rang</TableCell>
              <TableCell onClick={() => this.setSortType('fullShowRank')}>
                Full Show Punkte
              </TableCell>
              <TableCell onClick={() => this.setSortType('estimationGameRank')}>
                Schätzen Rang
              </TableCell>
              <TableCell onClick={() => this.setSortType('estimationGameRank')}>
                Schätzen Punkte
              </TableCell>
              {flagNames.map((flagName) => (
                <TableCell key={flagName} onClick={() => this.setSortType(`flags-${flagName}`)}>
                  {flagName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u._id}</TableCell>
                <TableCell>{u.firstName}</TableCell>
                <TableCell>{u.lastName}</TableCell>
                <TableCell>{u.alias || '-'}</TableCell>
                <TableCell>{u.email || '-'}</TableCell>
                <TableCell>{u.newsletter ? '✓' : '✕'}</TableCell>
                <TableCell>{u.fullShowRank}</TableCell>
                <TableCell>{u.fullShowScore}</TableCell>
                <TableCell>{(u.estimationGame && u.estimationGame.rank) || '-'}</TableCell>
                <TableCell>{(u.estimationGame && u.estimationGame.points) || '-'}</TableCell>
                {flagNames.map((flagName) => (
                  <TableCell key={flagName}>{u.flags && u.flags[flagName] ? '✓' : '✕'}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UserTable.propTypes = propTypes;

const userTableStyles = {
  wrapper: {
    maxWidth: '80%',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    overflow: 'scroll',
    fontFamily: 'Roboto Condensed',
  },
  table: {
    width: '100%',
  },
};

export default withStyles(userTableStyles)(UserTable);
