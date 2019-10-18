import React from 'react';
import { Link } from 'react-router-dom';

import ViewListIcon from '@material-ui/icons/ViewList';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import GroupIcon from '@material-ui/icons/Group';

import EditCandidates from './EditCandidates';
import EditInteractions from './EditInteractions_New';
import EditMenu from './EditMenu';
import EditAdmins from './EditAdmins';

const makeSettingsLink = (to) =>
  React.forwardRef((props, ref) => <Link {...props} innerRef={ref} to={`/admin/edit/${to}`} />);

// eslint-disable-next-line import/prefer-default-export
export const screens = [
  [
    {
      id: 'candidates',
      Link: makeSettingsLink('candidates'),
      title: 'Kandidaten',
      Icon: HowToRegIcon,
      Component: EditCandidates,
    },
    {
      id: 'interactions',
      Link: makeSettingsLink('interactions'),
      title: 'Interaktionen',
      Icon: ViewListIcon,
      Component: EditInteractions,
    },
    {
      id: 'menu',
      Link: makeSettingsLink('menu'),
      title: 'Getränkekarte',
      Icon: FastfoodIcon,
      Component: EditMenu,
    },
  ],
  [
    {
      id: 'admins',
      Link: makeSettingsLink('admins'),
      title: 'Adminbenutzer',
      Icon: GroupIcon,
      Component: EditAdmins,
    },
  ],
];
