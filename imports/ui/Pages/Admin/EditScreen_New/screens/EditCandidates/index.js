import { Meteor } from 'meteor/meteor';
import React from 'react';
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

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
};

const schema = new SimpleSchema({
  name: { type: String, label: 'Name' },
  imageUrl: { type: String, label: 'Bild-URL', regEx: SimpleSchema.RegEx.Url },
});

const schemaBridge = new SimpleSchemaBridge(schema);

// Todo: after inserting candidate, clear the form
const EditCandidates = ({ candidates }) => (
  <div>
    <h2>Neuer Kandidat</h2>
    <AutoForm schema={schemaBridge} onSubmit={(data) => insertCandidate.call(data)} />

    {candidates.map(({ _id, name, imageUrl, candidateNumber }) => (
      <div key={_id}>
        <div style={{ marginTop: 30 }} />
        <h2>{`${candidateNumber ? `Kandidat Nr. ${candidateNumber} ` : ''}${name}`}</h2>

        <button type="button" onClick={() => setCandidate.call({ _id, candidateNumber: 1 })}>
          Candidate 1
        </button>
        <button type="button" onClick={() => setCandidate.call({ _id, candidateNumber: 2 })}>
          Candidate 2
        </button>
        <button type="button" onClick={() => removeCandidate.call({ _id })}>
          Delete {name}
        </button>

        <AutoForm
          schema={schemaBridge}
          onSubmit={(data) => updateCandidate.call({ _id, ...data })}
          model={{ name, imageUrl }}
        />
      </div>
    ))}
  </div>
);

EditCandidates.propTypes = propTypes;

export default withTracker(() => {
  const candidatesHandle = Meteor.subscribe('candidates.allCandidates');
  const isReady = candidatesHandle.ready();
  const candidates = Candidates.find().fetch();

  return { candidates, isReady };
})(EditCandidates);
