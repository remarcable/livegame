import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Dialog from './Dialog';
import NoMenu from './NoMenu';
import MenuTable from './MenuTable';

import MenuCollection from '/imports/api/menu/collection';

import { insertMenuItem, removeMenuItem, updateMenuItem } from '/imports/api/menu/methods';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalIsOpened: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
};

// Todo: after inserting menu, clear the form
const EditMenu = ({ menuItems, openModal, closeModal, modalIsOpened, isReady }) => {
  const [editDialogId, setEditDialogId] = useState(null);
  const [editDialogIsOpened, setEditDialogIsOpened] = useState(false);
  const openEditDialog = (id) => {
    setEditDialogId(id);
    setEditDialogIsOpened(true);
  };
  const closeEditDialog = () => setEditDialogIsOpened(false);

  return (
    <>
      <MenuTable
        menuItems={menuItems}
        onEditMenuItem={openEditDialog}
        onDeleteMenuItem={(_id) => {
          const shouldDelete = confirm('Soll das Menu-Item wirklich gelöscht werden?'); // eslint-disable-line no-alert,no-restricted-globals
          if (shouldDelete) {
            removeMenuItem.call({ _id });
          }
        }}
      />

      {isReady && menuItems.length === 0 && <NoMenu handleClick={openModal} />}

      <Dialog
        title="Menu-Item erstellen"
        open={modalIsOpened}
        handleClose={(data) => {
          closeModal();
          if (!data) {
            return;
          }

          const { _id, ...rest } = data;
          insertMenuItem.call(rest);
        }}
      />
      <Dialog
        title="Menu-Item bearbeiten"
        menuModel={editDialogId ? menuItems.find(({ _id }) => _id === editDialogId) : undefined}
        open={editDialogIsOpened}
        handleClose={(data) => {
          closeEditDialog();
          if (!data) {
            return;
          }

          updateMenuItem.call(data);
        }}
      />
    </>
  );
};

EditMenu.propTypes = propTypes;

export default withTracker(() => {
  const menuItemsHandle = Meteor.subscribe('menuItems');
  const menuItems = MenuCollection.find().fetch();
  const isReady = menuItemsHandle.ready();

  return { menuItems, isReady };
})(EditMenu);
