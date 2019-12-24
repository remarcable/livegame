import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';

import MenuCollection from '/imports/api/menu/collection';

import InnerMenu from './Menu';

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
      <InnerMenu menuItems={menuItems} isReady={isReady} handleClose={handleClose} />
    </Dialog>
  );
};

Menu.propTypes = propTypes;

const useStyles = makeStyles({
  dialog: {
    backgroundColor: '#283339',
  },
});

export default withTracker(() => {
  const menuItemsHandle = Meteor.subscribe('menuItems');
  const menuItems = MenuCollection.find({}, { sort: { sortIndex: 1 } }).fetch();
  const isReady = menuItemsHandle.ready();

  return {
    menuItems,
    isReady,
  };
})(Menu);
