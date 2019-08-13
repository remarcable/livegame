import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

import LinkItems from './LinkItems';
import UserFunctionItems from './UserFunctionItems';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const SelectAdminPage = ({ classes }) => (
  <AdminLayout>
    <div className={classes.wrapper}>
      <Paper className={classes.content}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Adminseiten</ListSubheader>}
        >
          <LinkItems />
          <ListSubheader component="div">Funktionen</ListSubheader>
          <UserFunctionItems />
        </List>
      </Paper>
    </div>
  </AdminLayout>
);

SelectAdminPage.propTypes = propTypes;

const styles = {
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    minWidth: 300,
  },
};

export default withStyles(styles)(SelectAdminPage);
