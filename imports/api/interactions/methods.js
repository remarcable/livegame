import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import Interactions from './collection';
import AppState from '../appState/collection';

import * as interactionTypes from './types';
import * as interactionStates from './states';

// TODO: Put validation in own functions / files

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
    Interactions.update(interactionId, { $set: { state: interactionStates.ACTIVE } });
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
    Interactions.update(interactionId, { $set: { state: interactionStates.CLOSED } });
  },
});

export const previousInteraction = new ValidatedMethod({
  name: 'interactions.previousInteraction',
  mixins: [userIsAdminMixin],
  validate: null,
  run() {
    const { previous } = Interactions.findOne({ state: interactionStates.ACTIVE });
    startInteraction.call({ interactionId: previous });
  },
});

export const nextInteraction = new ValidatedMethod({
  name: 'interactions.nextInteraction',
  mixins: [userIsAdminMixin],
  validate: null,
  run() {
    const { next } = Interactions.findOne({ state: interactionStates.ACTIVE });
    startInteraction.call({ interactionId: next });
  },
});

// TODO: muss (genauso wie updateInteraction) super generisch sein. So, dass nur durch das Schema klar wird, welche Werte gebraucht werden und welche nicht und diese dann automatisch hier created werden können
export const createInteraction = new ValidatedMethod({
  name: 'interactions.create',
  mixins: [userIsAdminMixin],
  validate({ interactionType, question, answer }) {
    if (interactionType === interactionTypes.ESTIMATION_GAME) {
      check(question, String);
      check(answer, Number);
    } else if (interactionType === interactionTypes.ESTIMATION_VOTING) {
      check(question, String);
    } else {
      throw new ValidationError([
        {
          name: 'interactionType',
          type: 'interactions.create.noValidInteractionType',
        },
      ]);
    }
  },
  run({ interactionType, question, answer }) {
    let id;
    switch (interactionType) {
      case interactionTypes.ESTIMATION_GAME: {
        id = Interactions.insert({ type: interactionType, estimationGame: { question, answer } });
        break;
      }

      case interactionTypes.ESTIMATION_VOTING: {
        id = Interactions.insert({ type: interactionType, estimationVoting: { question } });
        break;
      }

      default:
    }

    AppState.update({}, { $push: { interactionsOrder: id } });
    return id;
  },
});

// TODO: implement method
export const updateInteraction = new ValidatedMethod({
  name: 'interactions.update',
  mixins: [userIsAdminMixin],
  validate({ id, question, answer = null, votingId = null }) {
    check(id, String);
    const { type: interactionType } = Interactions.findOne(id);

    if (interactionType === interactionTypes.ESTIMATION_GAME) {
      check(question, String);

      if (answer !== null) {
        check(answer, Number);
      } else if (votingId !== null) {
        check(votingId, String);
      } else {
        throw new ValidationError([
          {
            name: 'answer',
            type: 'interactions.update.onlyOneOfAnswerOrVotingIdAllowed',
          },
          {
            name: 'votingId',
            type: 'interactions.update.onlyOneOfAnswerOrVotingIdAllowed',
          },
        ]);
      }
    } else if (interactionType === interactionTypes.ESTIMATION_VOTING) {
      check(question, String);
    }
  },
  run({ id, question, answer = null, votingId = null }) {
    const { type: interactionType } = Interactions.findOne(id);

    switch (interactionType) {
      case interactionTypes.ESTIMATION_GAME: {
        return Interactions.update(id, {
          $set: {
            'estimationGame.question': question,
            'estimationGame.answer': answer,
            'estimationGame.votingId': votingId,
          },
        });
      }

      case interactionTypes.ESTIMATION_VOTING: {
        return Interactions.update(id, { $set: { 'estimationVoting.question': question } });
      }

      default:
    }
  },
});

export const removeInteraction = new ValidatedMethod({
  name: 'interactions.remove',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    Interactions.remove({ _id: id });
    AppState.update({}, { $pull: { interactionsOrder: id } });
  },
});

// TODO: Ensure that IDs are actually from documents in Interactions
export const updateInteractionsOrder = new ValidatedMethod({
  name: 'interactions.updateOrder',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    newOrder: { type: Array },
    'newOrder.$': { type: String },
  }).validator(),
  run({ newOrder }) {
    return AppState.update({}, { $set: { interactionsOrder: newOrder } });
  },
});
