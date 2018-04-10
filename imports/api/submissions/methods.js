import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Submissions from './collection';
import Interactions from '../interactions/collection';

import * as interactionStates from '../interactions/interactionStates';

/* eslint-disable import/prefer-default-export */
export const submit = new ValidatedMethod({
  name: 'submissions.insert',
  validate: new SimpleSchema({
    value: SimpleSchema.oneOf(Number, String), // TODO: Explanatory comment: Number for guessing, String for voting. Maybe change?
  }).validator(),
  run({ value }) {
    if (!Meteor.userId()) throw new Error('not-authorized');
    if (this.isSimulation) return;

    this.unblock();

    const userId = Meteor.userId();
    const currentInteraction = Interactions.findOne({ state: interactionStates.ACTIVE });
    if (!currentInteraction) throw new Meteor.Error('No active interaction');
    const interactionId = currentInteraction._id;
    const hasAlreadyAnswered = Submissions.findOne({ userId, interactionId });
    if (hasAlreadyAnswered) {
      throw new Meteor.Error('Already submitted for this interaction');
    }

    Submissions.insert({ userId, interactionId, value });
  },
});
