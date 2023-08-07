import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

import DocumentTitle from '/imports/ui/components/DocumentTitle';
import Logo from '/imports/ui/components/Logo';

import LinkItems from './LinkItems';
import UserFunctionItems from './UserFunctionItems';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const SelectAdminPage = ({ classes }) => (
  <>
    <DocumentTitle>Admin-Übersicht</DocumentTitle>

    <div className={classes.wrapper}>
      <Logo />
      <Paper className={classes.content}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Adminbereich</ListSubheader>}
        >
          <LinkItems />
          <ListSubheader component="div">Funktionen</ListSubheader>
          <UserFunctionItems />
        </List>
      </Paper>
    </div>
  </>
);

SelectAdminPage.propTypes = propTypes;

const styles = {
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    minWidth: 300,
    marginTop: 48,
  },
};

export default withStyles(styles)(SelectAdminPage);
