import { Meteor } from 'meteor/meteor';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Interactions from '/imports/api/interactions/collection';
import {
  startInteraction,
  previousInteraction,
  updateInteractionDetails,
  nextInteraction,
} from '/imports/api/interactions/methods';

import { interactionTypeNames } from '/imports/api/interactions/types';
import { mapSort } from '/imports/api/helpers/mapSort';
import sortFullShowGames from '/imports/api/helpers/sortFullShowGames';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';
import UpdateGames from './UpdateGames';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type!
  games: PropTypes.array.isRequired, // TODO: better type!
  isReady: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
};

const ShowScreen = ({ classes, isReady, interactions, games, hasNext, hasPrevious }) => {

  return (
    <AdminLayout>
      <div>
        {!isReady && <div>Loadings</div>}
        {isReady &&
          interactions.map((i) => (
            <ul key={i._id}>
              <li>
                {i.state === 'ACTIVE' && 'active:'} {i.type}{' '}
                <Button
                  variant="contained"
                  size="large"
                  className={classNames(classes.margin)}
                  onClick={() => startInteraction.call({ interactionId: i._id })}
                >
                  Start
                </Button>
              </li>
            </ul>
          ))}
      </div>
      <div>
        <Button
          variant="contained"
          size="large"
          className={classNames(classes.margin)}
          disabled={!hasPrevious} onClick={() => previousInteraction.call()}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          size="large"
          className={classNames(classes.margin)}
          disabled={!hasNext} onClick={() => nextInteraction.call()}
        >
          Next
        </Button>
      </div>
      <div>
        {isReady && (
          <UpdateGames
            games={games}
            updateScores={({ _id: id, pointsCandidate1, pointsCandidate2 }) =>
              updateInteractionDetails.call({ id, data: { pointsCandidate1, pointsCandidate2 } })
            }
            setWinner={({ _id: id, winner }) =>
              updateInteractionDetails.call({ id, data: { winner } })
            }
          />
        )}
      </div>
    </AdminLayout>
  );
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  }
});


ShowScreen.propTypes = propTypes;

export default withStyles(styles)(withTracker(() => {
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const isReady = interactionsHandle.ready();
  const interactions = Interactions.find().fetch();
  const games = interactions
    .filter((i) => i.type === interactionTypeNames.FULL_SHOW_GAME)
    .sort(sortFullShowGames);

  const currentInteraction = interactions.find(({ state }) => state === 'ACTIVE') || {}; // TODO: use interactionStates
  const hasNext = !!currentInteraction.next;
  const hasPrevious = !!currentInteraction.previous;

  return { interactions: mapSort(interactions), games, hasNext, hasPrevious, isReady };
})(ShowScreen));
