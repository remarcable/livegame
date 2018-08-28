import React from 'react';
import PropTypes from 'prop-types';

import EditInteraction from './EditInteraction';

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
  insertCandidate: PropTypes.func.isRequired,
  updateCandidate: PropTypes.func.isRequired,
  removeCandidate: PropTypes.func.isRequired,
  setCandidate: PropTypes.func.isRequired,
};
const schemaFields = {
  name: { type: String, label: 'Name' },
  imageUrl: { type: String, label: 'Bild-URL' },
};
const EditCandidates = ({
  candidates,
  insertCandidate,
  updateCandidate,
  removeCandidate,
  setCandidate,
}) => (
  <div>
    <h1>Candidates</h1>
    <EditInteraction
      title="Neuer Kandidat"
      currentData={{}}
      schemaFields={schemaFields}
      updateData={({ data }) => insertCandidate(data)}
    />

    {candidates.map(({ _id, name, imageUrl, candidateNumber }) => (
      <div key={_id}>
        <button onClick={() => setCandidate({ _id, candidateNumber: 1 })}>
          Activate as 1 {name}
        </button>
        <button onClick={() => setCandidate({ _id, candidateNumber: 2 })}>
          Activate as 2 {name}
        </button>
        <EditInteraction
          title={`${candidateNumber ? `Kandidat Nr. ${candidateNumber} ` : ''}${name}`}
          currentData={{ name, imageUrl }}
          schemaFields={schemaFields}
          updateData={({ data }) => updateCandidate({ _id, ...data })}
          removeInteraction={() => removeCandidate({ _id })}
          id={_id}
        />
      </div>
    ))}
  </div>
);

EditCandidates.propTypes = propTypes;

export default EditCandidates;
