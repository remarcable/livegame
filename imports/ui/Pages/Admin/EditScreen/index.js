import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

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
import EditInteraction from './EditInteraction';
import NewInteraction from './NewInteraction';
import SortInteractions from './SortInteractions';
import EditCandidates from './EditCandidates';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
};

const EditScreen = ({ isReady, interactions, candidates }) => (
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
          const interactionType = interactionTypes.get(i.type);
          const { schemaKey } = interactionType;

          return (
            <EditInteraction
              key={i._id}
              title={`${i.type}: ${i._id}`}
              id={i._id}
              currentData={i[schemaKey]}
              schemaFields={interactionType.getFields()}
              updateData={({ data }) => updateInteractionDetails.call({ id: i._id, data })}
              removeInteraction={({ id }) => removeInteraction.call({ id })}
            />
          );
        })}
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
          insertCandidate={({ name, imageUrl }) => insertCandidate.call({ name, imageUrl })}
          updateCandidate={({ _id, name, imageUrl }) =>
            updateCandidate.call({ _id, name, imageUrl })
          }
          removeCandidate={({ _id }) => removeCandidate.call({ _id })}
          setCandidate={({ _id }) => setCandidate.call({ _id })}
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
