import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Interactions from '/imports/api/interactions/collection';
import {
  startInteraction,
  previousInteraction,
  nextInteraction,
} from '/imports/api/interactions/methods';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
};

const ShowScreen = ({ isReady, interactions }) => (
  <AdminLayout>
    <div>
      {!isReady && <div>Loadings</div>}
      {isReady &&
        interactions.map((i) => (
          <ul key={i._id}>
            <li>
              {i.state === 'ACTIVE' && 'active:'} {i.type}{' '}
              <button onClick={() => startInteraction.call({ interactionId: i._id })}>Start</button>
            </li>
          </ul>
        ))}
    </div>
    <div>
      <button onClick={() => previousInteraction.call()}>Previous</button>
      <button onClick={() => nextInteraction.call()}>Next</button>
    </div>
  </AdminLayout>
);

ShowScreen.propTypes = propTypes;

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const isReady = interactionsHandle.ready();
  const interactions = Interactions.find().fetch();
  return { interactions, isReady };
})(ShowScreen);
