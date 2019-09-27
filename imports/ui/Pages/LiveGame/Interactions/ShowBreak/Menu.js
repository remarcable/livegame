import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';

import AppBar from './MenuAppBar';
import Headline from '/imports/ui/components/Headline';
import MenuItem from '/imports/ui/components/MenuItem';

const propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const menuItems = [
  {
    title: 'Caipi hat langen Namen',
    subtitle: 'Sehr lecker, lecker, lecker. Schmeckt super würzig und macht Spaß',
    price: '44,50',
    priceOverwrite: '3,50',
    imageUrl: 'https://picsum.photos/470/230?random=1',
  },
  {
    title: 'Caipi 2',
    subtitle: 'Sehr lecker, lecker, lecker',
    price: '4,50',
    priceOverwrite: '3,50',
    imageUrl: 'https://picsum.photos/470/230?random=2',
  },
  {
    title: 'Caipi 3',
    subtitle: 'Sehr lecker, lecker, lecker',
    price: '4,50',
    priceOverwrite: '3,50',
    imageUrl: 'https://picsum.photos/470/230?random=3',
  },
  {
    title: 'Caipi 4',
    price: '4,50',
    priceOverwrite: '3,50',
  },
  {
    title: 'Caipi 5',
    subtitle: 'Sehr lecker, lecker, lecker',
    price: '4,50',
  },
];

const Menu = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog fullScreen open={open} onClose={handleClose} classes={{ paper: classes.dialog }}>
      <Box width={1}>
        <AppBar handleClose={handleClose} />
        <Box px={2}>
          {menuItems.map((menuItem) => (
            <MenuItem key={menuItem.title} {...menuItem} />
          ))}
          <Headline className={classes.headline}>Cocktails</Headline>
        </Box>
      </Box>
    </Dialog>
  );
};

Menu.propTypes = propTypes;

const useStyles = makeStyles({
  dialog: {
    backgroundColor: '#283339',
  },
  headline: {
    display: 'block',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Menu;
