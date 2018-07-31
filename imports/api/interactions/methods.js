import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import Interactions from './collection';

import interactionTypes from './types';
import * as interactionStates from './states';

export const startInteraction = new ValidatedMethod({
  name: 'interactions.startInteraction',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    interactionId: String,
  }).validator(),
  run({ interactionId }) {
    Interactions.update(
      { state: interactionStates.ACTIVE },
      { $set: { state: interactionStates.CLOSED } },
    );

    return Interactions.update(interactionId, { $set: { state: interactionStates.ACTIVE } });
  },
});

export const stopInteraction = new ValidatedMethod({
  // should not be necessary, rather something like "emergency stop"
  name: 'interactions.stopInteraction',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    interactionId: String,
  }).validator(),
  run({ interactionId }) {
    return Interactions.update(interactionId, { $set: { state: interactionStates.CLOSED } });
  },
});

export const previousInteraction = new ValidatedMethod({
  name: 'interactions.previousInteraction',
  mixins: [userIsAdminMixin],
  validate: null,
  run() {
    const { previous } = Interactions.findOne({ state: interactionStates.ACTIVE });
    if (!previous) {
      throw new Meteor.Error('No previous interaction defined!');
    }

    startInteraction.call({ interactionId: previous });
  },
});

export const nextInteraction = new ValidatedMethod({
  name: 'interactions.nextInteraction',
  mixins: [userIsAdminMixin],
  validate: null,
  run() {
    const { next } = Interactions.findOne({ state: interactionStates.ACTIVE });
    if (!next) {
      throw new Meteor.Error('No previous interaction defined!');
    }

    startInteraction.call({ interactionId: next });
  },
});

export const createInteraction = new ValidatedMethod({
  name: 'interactions.create',
  mixins: [userIsAdminMixin],
  validate({ interactionType, ...data }) {
    interactionTypes.get(interactionType).validate({ data });
  },
  run({ interactionType, ...data }) {
    const { schemaKey } = interactionTypes.get(interactionType);
    return Interactions.insert({
      type: interactionType,
      [schemaKey]: data,
    });
  },
});

export const updateInteractionDetails = new ValidatedMethod({
  name: 'interactions.updateDetails',
  mixins: [userIsAdminMixin],
  validate({ id, ...details }) {
    check(id, String);
    const { type: interactionTypeName, ...interaction } = Interactions.findOne(id);
    const interactionType = interactionTypes.get(interactionTypeName);
    // apply updated fields on fields that are already in the document to not fail validation
    interactionType.validate({ data: { ...interaction[interactionType.schemaKey], ...details } });
  },
  run({ id, ...details }) {
    const { type } = Interactions.findOne(id);
    const { schemaKey } = interactionTypes.get(type);
    if (!schemaKey) {
      throw new Meteor.Error(
        `No schemaKey defined for ${type}. Aborted update of interactionDetails`,
      );
    }
    return Interactions.update(id, { $set: { [schemaKey]: details } });
  },
});

export const removeInteraction = new ValidatedMethod({
  name: 'interactions.remove',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    return Interactions.remove({ _id: id });
  },
});
