import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Interactions from '/imports/api/interactions/collection';
import interactionTypes from '/imports/api/interactions/types';
import {
  createInteraction,
  updateInteractionDetails,
  removeInteraction,
} from '/imports/api/interactions/methods';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';
import EditInteraction from './EditInteraction';
import NewInteraction from './NewInteraction';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
};

const EditScreen = ({ isReady, interactions }) => (
  <AdminLayout>
    <div>
      <NewInteraction
        createInteraction={({ interactionType, data }) =>
          createInteraction.call({ interactionType, data })
        }
      />
    </div>
    <div>
      {!isReady && <div>Loadings</div>}
      {isReady &&
        interactions.map((i) => {
          const interactionType = interactionTypes.get(i.type) || {};
          const { schemaKey } = interactionType;
          return (
            <EditInteraction
              key={i._id}
              title={`${i.type}: ${i._id}`}
              id={i._id}
              currentData={i[schemaKey]}
              schemaFields={interactionType.getFields()}
              updateData={({ data }) => updateInteractionDetails.call({ id: i._id, details: data })}
              removeInteraction={({ id }) => removeInteraction.call({ id })}
            />
          );
        })}
    </div>
  </AdminLayout>
);

EditScreen.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const isReady = interactionsHandle.ready();
  const interactions = Interactions.find().fetch();
  return { interactions, isReady };
})(EditScreen);
