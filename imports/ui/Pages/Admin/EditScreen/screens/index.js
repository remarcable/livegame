import React from 'react';
import { Link } from 'react-router-dom';

import ViewListIcon from '@material-ui/icons/ViewList';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import GroupIcon from '@material-ui/icons/Group';
import WarningIcon from '@material-ui/icons/Warning';

import EditCandidates from './EditCandidates';
import EditInteractions from './EditInteractions';
import EditMenu from './EditMenu';
import EditAdmins from './EditAdmins';
import ResetShow from './ResetShow';

const makeSettingsLink = (to) =>
  React.forwardRef((props, ref) => <Link {...props} innerRef={ref} to={`/admin/edit/${to}`} />);

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
      title: 'Speisen / Getränke',
      Icon: FastfoodIcon,
      Component: EditMenu,
    },
  ],
  [
    {
      id: 'reset-show',
      Link: makeSettingsLink('reset-show'),
      title: 'WBP Live Reset',
      Icon: WarningIcon,
      Component: ResetShow,
    },
  ],
  // [
  //   {
  //     id: 'admins',
  //     Link: makeSettingsLink('admins'),
  //     title: 'Adminbenutzer',
  //     Icon: GroupIcon,
  //     Component: EditAdmins,
  //   },
  // ],
];
