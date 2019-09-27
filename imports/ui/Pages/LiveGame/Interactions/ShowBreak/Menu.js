import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';

import Headline from '/imports/ui/components/Headline';
import MenuItem from '/imports/ui/components/MenuItem';

import MenuCollection from '/imports/api/menu/collection';

import AppBar from './MenuAppBar';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
  open: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const Menu = ({ menuItems, isReady, open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog fullScreen open={open} onClose={handleClose} classes={{ paper: classes.dialog }}>
      <Box width={1}>
        <AppBar handleClose={handleClose} />
        <Box px={2}>
          {!isReady && <Headline className={classes.loading}>Lädt...</Headline>}
          {menuItems.map(({ title, sections }, i) => (
            <div key={i}>
              <Headline className={classes.headline}>{title}</Headline>
              {sections.map((section, j) => (
                <MenuItem key={j} {...section} />
              ))}
            </div>
          ))}
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
  loading: {
    textAlign: 'center',
    marginTop: 50,
    display: 'block',
  },
  headline: {
    display: 'block',
    marginTop: 25,
    marginBottom: 10,
  },
});

export default withTracker(() => {
  const menuItemsHandle = Meteor.subscribe('menuItems');
  const menuItems = MenuCollection.find().fetch();
  const isReady = menuItemsHandle.ready();

  return {
    menuItems,
    isReady,
  };
})(Menu);
