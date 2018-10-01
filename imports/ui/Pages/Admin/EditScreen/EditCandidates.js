import React from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import AutoForm from 'uniforms-material/AutoForm';

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
  insertCandidate: PropTypes.func.isRequired,
  updateCandidate: PropTypes.func.isRequired,
  removeCandidate: PropTypes.func.isRequired,
  setCandidate: PropTypes.func.isRequired,
};

const schema = new SimpleSchema({
  name: { type: String, label: 'Name' },
  imageUrl: { type: String, label: 'Bild-URL', regEx: SimpleSchema.RegEx.Url },
});

// Todo: after inserting candidate, clear the form
const EditCandidates = ({
  candidates,
  insertCandidate,
  updateCandidate,
  removeCandidate,
  setCandidate,
}) => (
  <div>
    <h1>Candidates</h1>
    <h2>Neuer Kandidat</h2>
    <AutoForm schema={schema} onSubmit={(data) => insertCandidate(data)} />

    {candidates.map(({ _id, name, imageUrl, candidateNumber }) => (
      <div key={_id}>
        <div style={{ marginTop: 30 }} />
        <h2>{`${candidateNumber ? `Kandidat Nr. ${candidateNumber} ` : ''}${name}`}</h2>

        <button onClick={() => setCandidate({ _id, candidateNumber: 1 })}>Candidate 1</button>
        <button onClick={() => setCandidate({ _id, candidateNumber: 2 })}>Candidate 2</button>
        <button onClick={() => removeCandidate({ _id })}>Delete {name}</button>

        <AutoForm
          schema={schema}
          onSubmit={(data) => updateCandidate({ _id, ...data })}
          model={{ name, imageUrl }}
        />
      </div>
    ))}
  </div>
);

EditCandidates.propTypes = propTypes;

export default EditCandidates;
