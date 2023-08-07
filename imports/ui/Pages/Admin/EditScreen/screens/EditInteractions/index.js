import { Meteor } from 'meteor/meteor';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Interactions from '/imports/api/interactions/collection';
import {
  createInteraction,
  updateInteractionDetails,
  removeInteraction,
} from '/imports/api/interactions/methods';
import { bulkInsertInteractions } from '/imports/api/onboarding/methods';

import { interactionTypeNames } from '/imports/api/interactions/types';
import { getLabelForInteractionTypeName } from '/imports/api/helpers/getLabelForInteractionTypeName';
import { mapSort } from '/imports/api/helpers/mapSort';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import InteractionIcon from '/imports/ui/components/InteractionIcon';

import InteractionsTable from './InteractionsTable';
import Dialog from './Dialog';
import SetupWizard from './SetupWizard';
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

  const [setupWizardIsOpen, setSetupWizardIsOpen] = useState(false);
  const openSetupWizard = () => setSetupWizardIsOpen(true);
  const closeSetupWizard = () => setSetupWizardIsOpen(false);

  const [createInteractionDialogType, setCreateInteractionDialogType] = useState(null);
  const [createInteractionDialogIsOpened, setCreateInteractionDialogIsOpened] = useState(false);
  const openCreateInteractionDialog = (type) => {
    setCreateInteractionDialogType(type);
    setCreateInteractionDialogIsOpened(true);
  };
  const closeCreateInteractionDialog = () => setCreateInteractionDialogIsOpened(false);

  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const handleSnackbarClose = () => setSnackbarMessage(null);

  return (
    <>
      <Box display="flex" justifyContent="center">
        {!isReady && <CircularProgress />}
      </Box>
      {isReady && interactions.length === 0 && <NoInteractions handleClick={openSetupWizard} />}
      {isReady && (
        <Box mb={8}>
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
        </Box>
      )}

      <Menu
        id="create-interaction"
        anchorEl={createNewButtonRef}
        open={modalIsOpened}
        onClose={() => closeModal()}
      >
        {Object.keys(interactionTypeNames).map((typeName) => (
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
            <Typography variant="inherit">{getLabelForInteractionTypeName(typeName)}</Typography>
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        title={`${getLabelForInteractionTypeName(createInteractionDialogType)} erstellen`}
        model={{ type: createInteractionDialogType }}
        open={createInteractionDialogIsOpened}
        handleClose={(submittedData) => {
          closeCreateInteractionDialog();
          if (!submittedData) {
            return;
          }

          const { title, data } = submittedData;
          createInteraction.call(
            { interactionType: createInteractionDialogType, title, data },
            (err) => {
              if (err) {
                setSnackbarMessage(`Fehler: ${err.error}`);
                return;
              }

              setSnackbarMessage('Interaktion erstellt');
            },
          );
        }}
      />

      <Dialog
        title="Interaktion bearbeiten"
        model={editDialogId ? interactions.find(({ _id }) => _id === editDialogId) : undefined}
        open={editDialogIsOpened}
        handleClose={(submittedData) => {
          closeEditDialog();
          if (!submittedData) {
            return;
          }

          const { id, title, data } = submittedData;
          updateInteractionDetails.call({ id, title, data }, (err) => {
            if (err) {
              console.log(err);
              setSnackbarMessage(`Fehler: ${err.error}`);
              return;
            }

            setSnackbarMessage('Interaktion aktualisiert');
          });
        }}
      />

      <SetupWizard
        title="Setup Wizard"
        open={setupWizardIsOpen}
        handleClose={(submittedData) => {
          closeSetupWizard();
          if (!submittedData) {
            return;
          }

          bulkInsertInteractions.call(submittedData, (err) => {
            if (err) {
              console.log(err);
              setSnackbarMessage(`Fehler: ${err.error}`);
              return;
            }

            setSnackbarMessage('Interaktionen erstellt');
          });
        }}
      />

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
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
