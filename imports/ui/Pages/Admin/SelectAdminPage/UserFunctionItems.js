import { Meteor } from 'meteor/meteor';

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventSeatIcon from '@material-ui/icons/EventSeat';

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

export default UserFunctionItems;
