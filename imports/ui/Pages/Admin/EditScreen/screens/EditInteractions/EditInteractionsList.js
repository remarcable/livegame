import React from 'react';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-material/AutoForm';

import interactionTypes from '/imports/api/interactions/types';
import { updateInteractionDetails, removeInteraction } from '/imports/api/interactions/methods';

const EditInteractionsList = ({ interactions }) =>
  interactions.map((i) => {
    const interactionType = interactionTypes.get(i.type);
    const { schemaKey } = interactionType;
    const schema = new SimpleSchema({ title: String, ...interactionType.getFieldDefinitions() });
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

function handleSubmit(id, formData, schema) {
  const { title, ...data } = schema.clean(formData);
  updateInteractionDetails.call({ id, title, data });
}

export default EditInteractionsList;
