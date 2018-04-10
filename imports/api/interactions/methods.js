import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import Interactions from './collection';
import AppState from '../appState/collection';

import * as interactionStates from './interactionStates';

export const startInteraction = new ValidatedMethod({
  name: 'interactions.startInteraction',
  validate: new SimpleSchema({
    interactionId: String,
  }).validator(),
  run({ interactionId }) {
    Meteor.ensureUserIsAdmin(this.userId);

    Interactions.update(
      { state: interactionStates.ACTIVE },
      { $set: { state: interactionStates.CLOSED } },
    );
    Interactions.update(interactionId, { $set: { state: interactionStates.ACTIVE } });
  },
});

export const stopInteraction = new ValidatedMethod({
  name: 'interactions.stopInteraction',
  validate: new SimpleSchema({
    interactionId: String,
  }).validator(),
  run({ interactionId }) {
    Meteor.ensureUserIsAdmin(this.userId);
    Interactions.update(interactionId, { $set: { state: interactionStates.CLOSED } });
  },
});

// TODO: implement method
export const createInteraction = new ValidatedMethod({
  name: 'interactions.create',
  validate: null,
  run() {
    Meteor.ensureUserIsAdmin(this.userId);
  },
});

// TODO: implement method
export const updateInteraction = new ValidatedMethod({
  name: 'interactions.update',
  validate: null,
  run() {
    Meteor.ensureUserIsAdmin(this.userId);
  },
});

export const removeInteraction = new ValidatedMethod({
  name: 'interactions.remove',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    Meteor.ensureUserIsAdmin(this.userId);
    Interactions.remove({ _id: id });
    AppState.update({}, { $pull: { interactionsOrder: id } });
  },
});

// TODO: Ensure that IDs are actually from documents in Interactions
export const updateInteractionsOrder = new ValidatedMethod({
  name: 'interactions.updateOrder',
  validate: new SimpleSchema({
    newOrder: { type: Array },
    'newOrder.$': { type: String },
  }).validator(),
  run({ newOrder }) {
    Meteor.ensureUserIsAdmin(this.userId);
    return AppState.update({}, { $set: { interactionsOrder: newOrder } });
  },
});
