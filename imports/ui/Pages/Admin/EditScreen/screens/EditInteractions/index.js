import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Interactions from '/imports/api/interactions/collection';
import {
  moveToPosition,
  createInteraction,
  createManyInteractions,
} from '/imports/api/interactions/methods';

import { mapSort } from '/imports/api/helpers/mapSort';

import NewInteraction from './NewInteraction';
import SortInteractions from './SortInteractions';
import EditInteractionsList from './EditInteractionsList';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type
  isReady: PropTypes.bool.isRequired,
};

const EditInteractions = ({ interactions, isReady }) => {
  return (
    <>
      <div>
        <NewInteraction createInteraction={(data) => createInteraction.call(data)} />
      </div>
      <div>
        {!isReady && <div>Is Loading in EditScreen</div>}
        {<EditInteractionsList interactions={interactions} />}
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

EditInteractions.propTypes = propTypes;

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
