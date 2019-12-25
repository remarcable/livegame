import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { userIsLoggedInMixin } from '/imports/api/helpers/validatedMethodMixins';

import Submissions from './collection';
import Interactions from '../interactions/collection';

import * as interactionStates from '../interactions/states';
import interactionTypes from '../interactions/types';

const submittableInteractionTypeNames = [...interactionTypes.values()]
  .filter((type) => type.submittable)
  .map((type) => type.typeName);

export const submit = new ValidatedMethod({
  name: 'submissions.insert',
  mixins: [userIsLoggedInMixin],
  validate: new SimpleSchema({
    value: SimpleSchema.oneOf(Number, String), // TODO: Explanatory comment: Number for guessing, String for voting. Maybe change?
  }).validator(),
  run({ value }) {
    if (this.isSimulation) return; // TODO: is this really necessary? Doesn't seem like it is to me
    this.unblock();

    const currentInteraction = Interactions.findOne({
      state: interactionStates.ACTIVE,
      type: { $in: submittableInteractionTypeNames },
    });
    if (!currentInteraction) throw new Meteor.Error('submissions.insert.noActiveInteraction');

    const userId = Meteor.userId();
    const interactionId = currentInteraction._id;

    try {
      Submissions.insert({ userId, interactionId, value });
    } catch (e) {
      console.error(e);

      if (e.code === 11000) {
        throw new Meteor.Error('submissions.insert.duplicate');
      } else {
        throw new Meteor.Error('submissions.insert.generic');
      }
    }
  },
});
