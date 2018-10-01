import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import SimpleSchema from 'simpl-schema';
import AutoForm from 'uniforms-material/AutoForm';

import Interactions from '/imports/api/interactions/collection';
import interactionTypes from '/imports/api/interactions/types';
import {
  moveToPosition,
  createInteraction,
  updateInteractionDetails,
  removeInteraction,
} from '/imports/api/interactions/methods';

import Candidates from '/imports/api/candidates/collection';

import { mapSort } from '/imports/api/helpers/mapSort';

import {
  insertCandidate,
  removeCandidate,
  updateCandidate,
  setCandidate,
} from '/imports/api/candidates/methods';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';
import NewInteraction from './NewInteraction';
import SortInteractions from './SortInteractions';
import EditCandidates from './EditCandidates';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type!
  candidates: PropTypes.array.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
};

function handleSubmit(id, formData, schema) {
  const { title, ...data } = schema.clean(formData);
  updateInteractionDetails.call({ id, title, data });
}

const InteractionsEditList = ({ interactions }) =>
  interactions.map((i) => {
    const interactionType = interactionTypes.get(i.type);
    const { schemaKey } = interactionType;
    const schema = new SimpleSchema({ title: String, ...interactionType.getFields() });

    return (
      <div key={i._id}>
        <h3>
          {i.type} {i._id}
          <button onClick={() => removeInteraction.call({ id: i._id })}>X</button>
        </h3>
        <AutoForm
          schema={schema}
          model={{ title: i.title || '', ...i[schemaKey] }}
          onSubmit={(data) => handleSubmit(i._id, data, schema)}
        />
      </div>
    );
  });

const EditScreen = ({ isReady, interactions, candidates }) => (
  <AdminLayout>
    <div>
      <NewInteraction createInteraction={(data) => createInteraction.call(data)} />
    </div>
    <div>
      {!isReady && <div>Is Loading in EditScreen</div>}
      {<InteractionsEditList interactions={interactions} />}
    </div>
    <div>
      <SortInteractions
        interactions={interactions}
        changeOrder={({ id, pos }) => moveToPosition.call({ id, pos })}
      />
    </div>
    <div>
      {isReady && (
        <EditCandidates
          candidates={candidates}
          insertCandidate={(data) => insertCandidate.call(data)}
          updateCandidate={(data) => updateCandidate.call(data)}
          removeCandidate={(data) => removeCandidate.call(data)}
          setCandidate={(data) => setCandidate.call(data)}
        />
      )}
    </div>
  </AdminLayout>
);

EditScreen.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const candidatesHandle = Meteor.subscribe('candidates.allCandidates');
  const isReady = interactionsHandle.ready() && candidatesHandle.ready();
  const interactions = Interactions.find().fetch();
  const candidates = Candidates.find().fetch();

  return { interactions: mapSort(interactions), candidates, isReady };
})(EditScreen);
