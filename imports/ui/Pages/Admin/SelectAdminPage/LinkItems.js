import React from 'react';

import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import AirplayIcon from '@material-ui/icons/Airplay';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import KeyboardIcon from '@material-ui/icons/Keyboard';

import MaterialLink from './MaterialLink';

const links = [
  { text: 'App-Steuerung', to: '/admin/show', Icon: KeyboardIcon },
  { text: 'Liveview-Steuerung', to: '/admin/livecontrol', Icon: AddToQueueIcon },
  { text: 'Liveview', to: '/admin/liveview', Icon: AirplayIcon },
  { text: 'Spieldaten bearbeiten', to: '/admin/edit', Icon: EditIcon },
  { text: 'Spielerliste', to: '/admin/users', Icon: GroupIcon },
];

const LinkItems = () => (
  <>
    {links.map(({ text, to, Icon }) => (
      <MaterialLink key={to} text={text} to={to} Icon={Icon} />
    ))}
  </>
);

export default LinkItems;
