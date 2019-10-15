import { Meteor } from 'meteor/meteor';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-material/AutoForm';

import Candidates from '/imports/api/candidates/collection';

import {
  insertCandidate,
  removeCandidate,
  updateCandidate,
  setCandidate,
} from '/imports/api/candidates/methods';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CandidatesTable from './CandidatesTable';

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
  closeModal: PropTypes.func.isRequired,
  modalIsOpened: PropTypes.bool.isRequired,
};

const schema = new SimpleSchema({
  name: { type: String, label: 'Name' },
  imageUrl: { type: String, label: 'Bild-URL', regEx: SimpleSchema.RegEx.Url },
});

const schemaBridge = new SimpleSchemaBridge(schema);

const callSetCandidate = ({ _id, candidateNumber }) => setCandidate.call({ _id, candidateNumber });

const EditCandidates = ({ candidates, closeModal, modalIsOpened }) => {
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
          const shouldDelete = confirm('Möchtest du den Kandidaten wirklich löschen?');
          if (shouldDelete) {
            removeCandidate.call({ _id });
          }
        }}
        setCandidate={callSetCandidate}
      />
      <CreateDialog open={modalIsOpened} handleClose={closeModal} />
      <EditDialog
        candidate={candidates.find(({ _id }) => _id === editDialogId)}
        open={editDialogIsOpened}
        handleClose={closeEditDialog}
      />
    </>
  );
};

const CreateDialog = ({ open, handleClose }) => {
  const [formInstance, setForm] = useState(null);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Kandidat erstellen</DialogTitle>
      <DialogContent>
        <AutoForm
          schema={schemaBridge}
          onSubmit={(data) => {
            insertCandidate.call(data);
            handleClose();
          }}
          ref={(form) => setForm(form)}
          submitField={() => <input type="submit" hidden />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Abbrechen
        </Button>
        <Button
          onClick={() => {
            if (formInstance) {
              formInstance.submit();
            }
          }}
          color="primary"
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useEditDialogStyles = makeStyles({
  avatar: {
    width: 65,
    height: 65,
  },
});

const EditDialog = ({ candidate = {}, open, handleClose }) => {
  const [formInstance, setForm] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const classes = useEditDialogStyles();
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Kandidat bearbeiten</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={1}>
          <Avatar src={imageUrl || candidate.imageUrl} className={classes.avatar}>
            {!imageUrl && candidate.name && candidate.name[0].toUpperCase()}
          </Avatar>
        </Box>
        <AutoForm
          schema={schemaBridge}
          onSubmit={(data) => {
            updateCandidate.call({ _id: candidate._id, ...data });
            handleClose();
          }}
          model={{ name: candidate.name, imageUrl: candidate.imageUrl }}
          ref={(form) => setForm(form)}
          submitField={() => <input type="submit" hidden />}
          onChange={(key, value) => {
            if (key === 'imageUrl') {
              setImageUrl(value);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Abbrechen
        </Button>
        <Button
          onClick={() => {
            if (formInstance) {
              formInstance.submit();
            }
          }}
          color="primary"
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditCandidates.propTypes = propTypes;

export default withTracker(() => {
  Meteor.subscribe('candidates.allCandidates');
  const candidates = Candidates.find().fetch();

  return { candidates };
})(EditCandidates);
