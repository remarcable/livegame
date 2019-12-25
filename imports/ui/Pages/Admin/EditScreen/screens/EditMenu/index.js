import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

import MenuCollection from '/imports/api/menu/collection';
import { insertMenuItem, removeMenuItem, updateMenuItem } from '/imports/api/menu/methods';

import Menu from '/imports/ui/components/Menu/Menu';

import Dialog from './Dialog';
import NoMenu from './NoMenu';
import MenuTable from './MenuTable';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalIsOpened: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
};

// Todo: after inserting menu, clear the form
const EditMenu = ({ menuItems, openModal, closeModal, modalIsOpened, isReady }) => {
  const classes = useStyles();

  const [editDialogId, setEditDialogId] = useState(null);
  const [editDialogIsOpened, setEditDialogIsOpened] = useState(false);
  const openEditDialog = (id) => {
    setEditDialogId(id);
    setEditDialogIsOpened(true);
  };
  const closeEditDialog = () => setEditDialogIsOpened(false);

  return (
    <>
      <Box display="flex">
        <Box flexGrow={1}>
          <MenuTable
            menuItems={menuItems}
            onEditMenuItem={openEditDialog}
            onDeleteMenuItem={(_id) => {
              const shouldDelete = confirm('Soll der Abschnitt wirklich gelöscht werden?'); // eslint-disable-line no-alert,no-restricted-globals
              if (shouldDelete) {
                removeMenuItem.call({ _id });
              }
            }}
          />
        </Box>
        {isReady && menuItems.length > 0 && (
          <Box
            width={375}
            height={667}
            ml={3}
            top={16}
            position="sticky"
            className={classes.menuPreview}
            boxShadow={1}
          >
            <Menu menuItems={menuItems} isReady />
          </Box>
        )}
      </Box>

      {isReady && menuItems.length === 0 && <NoMenu handleClick={openModal} />}

      <Dialog
        title="Abschnitt erstellen"
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
        title="Abschnitt bearbeiten"
        model={editDialogId ? menuItems.find(({ _id }) => _id === editDialogId) : undefined}
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

const useStyles = makeStyles({
  menuPreview: {
    borderRadius: 4,
    overflow: 'scroll',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

EditMenu.propTypes = propTypes;

export default withTracker(() => {
  const menuItemsHandle = Meteor.subscribe('menuItems');
  const menuItems = MenuCollection.find({}, { sort: { sortIndex: 1 } }).fetch();
  const isReady = menuItemsHandle.ready();

  return { menuItems, isReady };
})(EditMenu);
