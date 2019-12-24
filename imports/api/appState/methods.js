import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import AppState from './collection';
import { rankDisplayModes } from './rank-display-modes';

export const displayInteraction = new ValidatedMethod({
  name: 'app.displayInteraction',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    interactionId: { type: String },
  }).validator(),
  run({ interactionId }) {
    AppState.update({}, { $set: { interactionToShow: interactionId } });
  },
});

export const showRanksUpTo = new ValidatedMethod({
  name: 'app.showRanksUpTo',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    mode: { type: String, allowedValues: rankDisplayModes },
  }).validator(),
  run({ mode }) {
    AppState.update(
      {},
      {
        $set: { rankDisplayMode: mode },
      },
    );
  },
});
