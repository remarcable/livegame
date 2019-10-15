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

import CandidatesTable from './CandidatesTable';
import Dialog from './Dialog';

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
  closeModal: PropTypes.func.isRequired,
  modalIsOpened: PropTypes.bool.isRequired,
};

const callSetCandidate = ({ _id, candidateNumber }) => setCandidate.call({ _id, candidateNumber });

const EditCandidates = ({ candidates, closeModal, modalIsOpened }) => {
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
        candidateModel={
          editDialogId ? candidates.find(({ _id }) => _id === editDialogId) : undefined
        }
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
  Meteor.subscribe('candidates.allCandidates');
  const candidates = Candidates.find().fetch();

  return { candidates };
})(EditCandidates);
