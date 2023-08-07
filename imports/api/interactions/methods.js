import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';
import { mapSort } from '/imports/api/helpers/mapSort';

import Interactions from './collection';

import interactionTypes, { interactionTypeNames } from './types';
import * as interactionStates from './states';

function validateEstimationGameData(data) {
  if (data.answer !== undefined && !!data.votingId) {
    throw new Meteor.Error('Entweder Antwort oder Voting ist erlaubt, aber nicht beide');
  }

  if (data.answer === undefined && data.votingId === undefined) {
    throw new Meteor.Error('Antwort / Voting ist notwendig');
  }

  if (data.answer) {
    check(data.answer, Number);
  }

  if (data.votingId) {
    check(data.votingId, String);
  }
}

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
    const { previous } = Interactions.findOne({ state: interactionStates.ACTIVE }) || {};
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
    const { next } = Interactions.findOne({ state: interactionStates.ACTIVE }) || {};
    if (!next) {
      throw new Meteor.Error('No next interaction defined!');
    }

    startInteraction.call({ interactionId: next });
  },
});

export const moveToPosition = new ValidatedMethod({
  name: 'interactions.moveToPosition',
  mixins: [userIsAdminMixin],
  validate({ id, pos }) {
    check(id, String);
    check(pos, Number);
    const interaction = Interactions.findOne({ _id: id });
    const interactionCount = Interactions.find().count();

    if (!interaction) {
      throw new Meteor.Error(`No interaction exists with id ${id}`);
    }

    const maxPos = interactionCount - 1;
    if (pos < 0 || pos > maxPos) {
      throw new Meteor.Error(`Argument pos is only allowed in range between 0 and ${maxPos}`);
    }
  },

  run({ id, pos }) {
    const currentInteraction = Interactions.findOne(
      { _id: id },
      { fields: { previous: 1, next: 1 } },
    );

    const interactions = Interactions.find(
      {},
      { fields: { _id: 1, previous: 1, next: 1 } },
    ).fetch();

    const interactionsInOrder = mapSort(interactions);
    const interactionIdsInOrder = interactionsInOrder.map((i) => i._id);

    const { next: oldNextId, previous: oldPreviousId } = currentInteraction;

    Interactions.update({ _id: oldNextId }, { $set: { previous: oldPreviousId } });
    Interactions.update({ _id: oldPreviousId }, { $set: { next: oldNextId } });

    const interactionIdsInOrderWithoutCurrentId = interactionIdsInOrder.filter(
      (interactionId) => interactionId !== id,
    );

    const newPreviousId = interactionIdsInOrderWithoutCurrentId[pos - 1] || null;
    const newNextId = interactionIdsInOrderWithoutCurrentId[pos] || null;

    Interactions.update({ _id: newPreviousId }, { $set: { next: id } });
    Interactions.update({ _id: newNextId }, { $set: { previous: id } });
    Interactions.update({ _id: id }, { $set: { next: newNextId, previous: newPreviousId } });
  },
});

export const createInteraction = new ValidatedMethod({
  name: 'interactions.create',
  mixins: [userIsAdminMixin],
  validate({ interactionType, title, data }) {
    check(title, String);
    if (interactionType === interactionTypeNames.ESTIMATION_GAME) {
      validateEstimationGameData(data);
    } else {
      interactionTypes.get(interactionType).validate({ data });
    }
  },
  run({ interactionType, title, data }) {
    const { schemaKey } = interactionTypes.get(interactionType);
    const { _id: lastInteractionId } =
      Interactions.findOne({ next: null }, { fields: { _id: 1 } }) || {};
    const newInteractionId = Interactions.insert({
      type: interactionType,
      title,
      [schemaKey]: data,

      // the first interaction to be created does not yet have a predecessor
      previous: lastInteractionId || null,
      next: null,
    });

    Interactions.update({ _id: lastInteractionId }, { $set: { next: newInteractionId } });

    // if this is the first interaction to be inserted
    if (!lastInteractionId) {
      Interactions.update({ _id: newInteractionId }, { $set: { state: interactionStates.ACTIVE } });
    }

    return newInteractionId;
  },
});

export const updateInteractionDetails = new ValidatedMethod({
  name: 'interactions.updateDetails',
  mixins: [userIsAdminMixin],
  validate({ id, title, data }) {
    check(id, String);
    check(title, Match.Optional(String));
    const { type: interactionTypeName, ...interaction } = Interactions.findOne(id) || {};
    const interactionType = interactionTypes.get(interactionTypeName);

    // TODO HACK: Validation for answer/votingId is not really nice
    if (interactionTypeName === interactionTypeNames.ESTIMATION_GAME) {
      validateEstimationGameData(data);
    } else {
      // apply updated fields on fields that are already in the document to not fail validation
      interactionType.validate({ data: { ...interaction[interactionType.schemaKey], ...data } });
    }
  },
  run({ id, title, data }) {
    const { type, ...interaction } = Interactions.findOne(id);
    // TODO HACK: quick fix
    if (type === interactionTypeNames.ESTIMATION_GAME) {
      const { schemaKey } = interactionTypes.get(type);
      const setQuery = { [schemaKey]: data };
      const unsetQuery = {};

      if (title) {
        setQuery.title = title;
      }

      if (data.answer === undefined) {
        unsetQuery[`${schemaKey}.answer`] = 1;
        Interactions.update(id, { $unset: unsetQuery });
      }

      if (data.votingId === undefined) {
        unsetQuery[`${schemaKey}.votingId`] = 1;
        Interactions.update(id, { $unset: unsetQuery });
      }

      return Interactions.update(id, { $set: setQuery });
    }

    const { schemaKey } = interactionTypes.get(type);
    const currentData = interaction[schemaKey];
    const setQuery = { [schemaKey]: { ...currentData, ...data } };

    if (title) {
      setQuery.title = title;
    }

    return Interactions.update(id, { $set: setQuery });
  },
});

export const removeInteraction = new ValidatedMethod({
  name: 'interactions.remove',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    const { _id, state, next, previous } = Interactions.findOne(
      { _id: id },
      { fields: { state: 1, previous: 1, next: 1 } },
    );
    Interactions.update({ _id: next }, { $set: { previous } });
    Interactions.update({ _id: previous }, { $set: { next } });

    // ensure that there always is an interaction with ACTIVE state
    if (state === interactionStates.ACTIVE) {
      if (next) {
        Interactions.update({ _id: next }, { $set: { state: interactionStates.ACTIVE } });
      } else {
        Interactions.update({ _id: previous }, { $set: { state: interactionStates.ACTIVE } });
      }
    }
    return Interactions.remove({ _id });
  },
});

export const setClosedState = new ValidatedMethod({
  name: 'interactions.setClosedState',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    interactionId: String,
  }).validator(),
  run({ interactionId }) {
    return Interactions.update({ _id: interactionId, state: null }, { $set: { state: 'CLOSED' } });
  },
});

export const unsetClosedState = new ValidatedMethod({
  name: 'interactions.unsetClosedState',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    interactionId: String,
  }).validator(),
  run({ interactionId }) {
    return Interactions.update({ _id: interactionId, state: 'CLOSED' }, { $set: { state: null } });
  },
});
