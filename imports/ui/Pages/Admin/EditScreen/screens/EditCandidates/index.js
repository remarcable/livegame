import { Meteor } from 'meteor/meteor';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Candidates from '/imports/api/candidates/collection';

import {
  insertCandidate,
  removeCandidate,
  updateCandidate,
  setCandidate,
} from '/imports/api/candidates/methods';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import CandidatesTable from './CandidatesTable';
import Dialog from './Dialog';
import NoCandidates from './NoCandidates';

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalIsOpened: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
};

const callSetCandidate = ({ _id, candidateNumber }) => setCandidate.call({ _id, candidateNumber });

const EditCandidates = ({ candidates, openModal, closeModal, modalIsOpened, isReady }) => {
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
      {isReady && candidates.length === 0 && <NoCandidates handleClick={openModal} />}
      {isReady && (
        <CandidatesTable
          candidates={candidates}
          onEditCandidate={(_id) => openEditDialog(_id)}
          onDeleteCandidate={(_id) => {
            const shouldDelete = confirm('Soll der Kandidat wirklich gelöscht werden?');
            if (shouldDelete) {
              removeCandidate.call({ _id });
            }
          }}
          setCandidate={callSetCandidate}
        />
      )}

      <Dialog
        title="Kandidat erstellen"
        open={modalIsOpened}
        handleClose={(data) => {
          closeModal();
          if (!data) {
            return;
          }

          const { name, imageUrl } = data;
          insertCandidate.call({ name, imageUrl });
        }}
      />

      <Dialog
        title="Kandidat bearbeiten"
        model={editDialogId ? candidates.find(({ _id }) => _id === editDialogId) : undefined}
        open={editDialogIsOpened}
        handleClose={(data) => {
          closeEditDialog();
          if (!data) {
            return;
          }

          const { _id, name, imageUrl } = data;
          updateCandidate.call({ _id, name, imageUrl });
        }}
      />
    </>
  );
};

EditCandidates.propTypes = propTypes;

export default withTracker(() => {
  const candidatesHandle = Meteor.subscribe('candidates.allCandidates');
  const candidates = Candidates.find().fetch();
  const isReady = candidatesHandle.ready();
  return { candidates, isReady };
})(EditCandidates);
