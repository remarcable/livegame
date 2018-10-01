import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// material-ui
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const SelectAdminPage = ({ classes }) => {

  return (
    <AdminLayout>
      <h1 className={classNames(classes.margin)}>
        Admin Bereich
      </h1>

      <Button
        size="large"
        className={classNames(classes.margin)}
        color="primary"
        variant="contained"
        component={Link}
        to="/admin/show"
      >
       ShowScreen
      </Button>

      <Button
        size="large"
        className={classNames(classes.margin)}
        color="primary"
        variant="contained"
        component={Link}
        to="/admin/edit"
      >
       EditScreen
      </Button>

      <Button
        size="large"
        className={classNames(classes.margin)}
        color="primary"
        variant="contained"
        component={Link}
        to="/admin/users"
      >
       UserList
      </Button>

      <Button
        size="large"
        className={classNames(classes.margin)}
        color="primary"
        variant="contained"
        component={Link}
        to="/admin/liveview"
      >
       LiveView
      </Button>

      <Button
        size="large"
        className={classNames(classes.margin)}
        color="primary"
        variant="contained"
        component={Link}
        to="/admin/livecontrol"
      >
       LiveControl
      </Button>
    </AdminLayout>
  )
};

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(SelectAdminPage);
