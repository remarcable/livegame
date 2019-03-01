import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import AirplayIcon from '@material-ui/icons/Airplay';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventSeatIcon from '@material-ui/icons/EventSeat';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

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

const LinkItems = () => (
  <>
    <MaterialLink text="App-Steuerung" to="/admin/show" Icon={KeyboardIcon} />
    <MaterialLink text="Daten bearbeiten" to="/admin/edit" Icon={EditIcon} />
    <MaterialLink text="Spielerliste" to="/admin/users" Icon={GroupIcon} />
    <MaterialLink text="Liveview" to="/admin/liveview" Icon={AirplayIcon} />
    <MaterialLink text="Liveview-Steuerung" to="/admin/livecontrol" Icon={AddToQueueIcon} />
  </>
);

const UserFunctionItems = () => (
  <>
    <ListItem button divider>
      <ListItemIcon>
        <EventSeatIcon />
      </ListItemIcon>
      <ListItemText primary="Nichts tun" />
    </ListItem>
    <ListItem button onClick={() => Meteor.logout()}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Abmelden" />
    </ListItem>
  </>
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

const MaterialLink = ({ to, text, Icon }) => (
  <ListItem
    button
    divider
    component={({ children, ...props }) => (
      <Link to={to} {...props}>
        {children}
      </Link>
    )}
  >
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const materialLinkPropTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};

MaterialLink.propTypes = materialLinkPropTypes;
