import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-material/AutoForm';

import Interactions from '/imports/api/interactions/collection';
import interactionTypes from '/imports/api/interactions/types';
import {
  moveToPosition,
  createInteraction,
  createManyInteractions,
  updateInteractionDetails,
  removeInteraction,
} from '/imports/api/interactions/methods';

import { mapSort } from '/imports/api/helpers/mapSort';

import NewInteraction from './NewInteraction';
import SortInteractions from './SortInteractions';

const EditInteractions = ({ interactions, isReady }) => {
  return (
    <>
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
        <form onSubmit={handleOnSubmit}>
          <h1>Viele Interaktionen als CSV erstellen</h1>
          <textarea name="interactionsString" style={{ width: '80%', minHeight: 300 }} />
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

function handleOnSubmit(e) {
  e.preventDefault();

  const input = e.target.interactionsString.value;
  createManyInteractions.call({ input }, (err, res) => {
    if (err) {
      alert(`Fehler: ${err.message}`);
    } else {
      alert('Fertig: ', res);
    }
  });
}

function handleSubmit(id, formData, schema) {
  const { title, ...data } = schema.clean(formData);
  updateInteractionDetails.call({ id, title, data });
}

const InteractionsEditList = ({ interactions }) =>
  interactions.map((i) => {
    const interactionType = interactionTypes.get(i.type);
    const { schemaKey } = interactionType;
    const schema = new SimpleSchema({ title: String, ...interactionType.getFields() });
    const schemaBridge = new SimpleSchemaBridge(schema);

    return (
      <div key={i._id}>
        <h3>
          {i.type} {i._id}
          <button type="button" onClick={() => removeInteraction.call({ id: i._id })}>
            X
          </button>
        </h3>
        <AutoForm
          schema={schemaBridge}
          model={{ title: i.title || '', ...i[schemaKey] }}
          onSubmit={(data) => handleSubmit(i._id, data, schema)}
        />
      </div>
    );
  });

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
