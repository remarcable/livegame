import { Meteor } from 'meteor/meteor';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Interactions from '/imports/api/interactions/collection';
import {
  moveToPosition,
  createInteraction,
  createManyInteractions,
  updateInteractionDetails,
  removeInteraction,
} from '/imports/api/interactions/methods';

import interactionTypes from '/imports/api/interactions/types';
import { mapSort } from '/imports/api/helpers/mapSort';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import InteractionIcon from '/imports/ui/components/InteractionIcon';

import InteractionsTable from './InteractionsTable';
import Dialog from './Dialog';
import NoInteractions from './NoInteractions';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalIsOpened: PropTypes.bool.isRequired,
  createNewButtonRef: PropTypes.object.isRequired, // TODO: better type
  isReady: PropTypes.bool.isRequired,
};

const EditInteractions = ({
  interactions,
  openModal,
  closeModal,
  modalIsOpened,
  createNewButtonRef,
  isReady,
}) => {
  // have both editDialogId and editDialogIsOpened in state to be able to close the dialog
  // and still being able to show the edited data while transitioning
  const [editDialogId, setEditDialogId] = useState(null);
  const [editDialogIsOpened, setEditDialogIsOpened] = useState(false);
  const openEditDialog = (id) => {
    setEditDialogId(id);
    setEditDialogIsOpened(true);
  };
  const closeEditDialog = () => setEditDialogIsOpened(false);

  const [createInteractionDialogType, setCreateInteractionDialogType] = useState(null);
  const [createInteractionDialogIsOpened, setCreateInteractionDialogIsOpened] = useState(false);
  const openCreateInteractionDialog = (type) => {
    setCreateInteractionDialogType(type);
    setCreateInteractionDialogIsOpened(true);
  };
  const closeCreateInteractionDialog = () => setCreateInteractionDialogIsOpened(false);

  return (
    <>
      <Box display="flex" justifyContent="center">
        {!isReady && <CircularProgress />}
      </Box>
      {isReady && interactions.length === 0 && <NoInteractions handleClick={openModal} />}
      {isReady && (
        <InteractionsTable
          interactions={interactions}
          onEditInteraction={(_id) => openEditDialog(_id)}
          onDeleteInteraction={(_id) => {
            const shouldDelete = confirm('Soll die Interaction wirklich gelöscht werden?');
            if (shouldDelete) {
              removeInteraction.call({ id: _id });
            }
          }}
        />
      )}

      <Menu
        id="create-interaction"
        anchorEl={createNewButtonRef}
        open={modalIsOpened}
        onClose={() => closeModal()}
      >
        {[...interactionTypes.keys()].map((typeName) => (
          <MenuItem
            key={typeName}
            onClick={() => {
              closeModal();
              openCreateInteractionDialog();
              setCreateInteractionDialogType(typeName);
            }}
          >
            <ListItemIcon>
              <InteractionIcon type={typeName} disableTooltip />
            </ListItemIcon>
            <Typography variant="inherit">{typeName}</Typography>
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        dialogTitle={`${createInteractionDialogType} erstellen`}
        interactionModel={{ type: createInteractionDialogType }}
        open={createInteractionDialogIsOpened}
        handleClose={(submittedData) => {
          closeCreateInteractionDialog();
          if (!submittedData) {
            return;
          }

          const { title, data } = submittedData;
          createInteraction.call({ interactionType: createInteractionDialogType, title, data });
        }}
      />

      <Dialog
        dialogTitle="Interaktion bearbeiten"
        interactionModel={
          editDialogId ? interactions.find(({ _id }) => _id === editDialogId) : undefined
        }
        open={editDialogIsOpened}
        handleClose={(submittedData) => {
          closeEditDialog();
          if (!submittedData) {
            return;
          }

          const { id, title, data } = submittedData;
          updateInteractionDetails.call({ id, title, data });
        }}
      />
    </>
  );
};

EditInteractions.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const isReady = interactionsHandle.ready();
  const interactions = Interactions.find().fetch();

  let sortedInteractions = [];

  try {
    sortedInteractions = mapSort(interactions);
  } catch (e) {
    console.log(`Fehler beim Sortieren!`, e.message);
  }

  return { interactions: sortedInteractions, isReady };
})(EditInteractions);
