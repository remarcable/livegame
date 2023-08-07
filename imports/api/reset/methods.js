import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Submissions from '/imports/api/submissions/collection';
import Interactions from '/imports/api/interactions/collection';
import AppState from '/imports/api/appState/collection';
import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';
import * as rankDisplayModes from '/imports/api/appState/rank-display-modes';

export const resetGameData = new ValidatedMethod({
  name: 'admin.resetGameData',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({}).validator(),
  run() {
    Meteor.users.remove({ role: { $ne: 'admin' } });
    Submissions.remove({});
    AppState.update(
      {},
      { $set: { rankDisplayMode: rankDisplayModes.ALL, interactionToShow: null } },
    );
    Interactions.update({}, { $set: { state: null } }, { multi: true });
    Interactions.update(
      { type: 'FULL_SHOW_GAME' },
      {
        $set: {
          'fullShowGame.pointsCandidate1': 0,
          'fullShowGame.pointsCandidate2': 0,
          'fullShowGame.winner': 'NONE',
        },
      },
      { multi: true },
    );
    Interactions.update(
      { type: 'PARTICIPATION_VOTING' },
      {
        $set: {
          'participationVoting.selectedParticipant': null,
          'participationVoting.selectionState': 'WAITING',
        },
      },
      { multi: true },
    );
  },
});
