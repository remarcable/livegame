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

import { mapSort } from '/imports/api/helpers/mapSort';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import InteractionsTable from './InteractionsTable';
import Dialog from './Dialog';
import NoInteractions from './NoInteractions';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalIsOpened: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
};

const EditInteractions = ({ interactions, openModal, closeModal, modalIsOpened, isReady }) => {
  // have both editDialogId and editDialogIsOpened in state to be able to close the dialog
  // and still being able to show the edited data while transitioning
  const [editDialogId, setEditDialogId] = useState(null);
  const [editDialogIsOpened, setEditDialogIsOpened] = useState(false);
  const openEditDialog = (id) => {
    setEditDialogId(id);
    setEditDialogIsOpened(true);
  };
  const closeEditDialog = () => setEditDialogIsOpened(false);

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

      <Dialog
        dialogTitle="Interaktion erstellen"
        open={modalIsOpened}
        handleClose={(submittedData) => {
          closeModal();
          if (!submittedData) {
            return;
          }

          const { interactionType, title, data } = submittedData;
          createInteraction.call({ interactionType, title, data });
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
