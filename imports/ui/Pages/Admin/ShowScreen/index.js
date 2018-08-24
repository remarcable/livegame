import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Interactions from '/imports/api/interactions/collection';
import {
  startInteraction,
  previousInteraction,
  updateInteractionDetails,
  nextInteraction,
} from '/imports/api/interactions/methods';

import { typeNames } from '/imports/api/interactions/types';
import { mapSort } from '/imports/api/helpers/mapSort';
import sortFullShowGames from '/imports/api/helpers/sortFullShowGames';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';
import UpdateGames from './UpdateGames';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type!
  games: PropTypes.array.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
};

const ShowScreen = ({ isReady, interactions, games }) => (
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
    <div>
      {isReady && (
        <UpdateGames
          games={games}
          updateScores={({ _id: id, pointsPaul, pointsCandidate }) =>
            updateInteractionDetails.call({ id, data: { pointsPaul, pointsCandidate } })
          }
          setWinner={({ _id: id, winner }) =>
            updateInteractionDetails.call({ id, data: { winner } })
          }
        />
      )}
    </div>
  </AdminLayout>
);

ShowScreen.propTypes = propTypes;

const interactionTypeNames = typeNames();

export default withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const isReady = interactionsHandle.ready();
  const interactions = Interactions.find().fetch();
  const games = interactions
    .filter((i) => i.type === interactionTypeNames.FULL_SHOW_GAME)
    .sort(sortFullShowGames);

  return { interactions: mapSort(interactions), games, isReady };
})(ShowScreen);
