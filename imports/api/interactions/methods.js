import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import Interactions from './collection';
import AppState from '../appState/collection';

import * as interactionTypes from './interactionTypes';
import * as interactionStates from './interactionStates';

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
  name: 'interactions.stopInteraction',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    interactionId: String,
  }).validator(),
  run({ interactionId }) {
    Interactions.update(interactionId, { $set: { state: interactionStates.CLOSED } });
  },
});

export const createInteraction = new ValidatedMethod({
  name: 'interactions.create',
  mixins: [userIsAdminMixin],
  validate({ interactionType, question, answer }) {
    if (interactionType === interactionTypes.GUESSING_GAME) {
      check(question, String);
      check(answer, Number);
    } else if (interactionType === interactionTypes.GUESSING_VOTING) {
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
      case interactionTypes.GUESSING_GAME: {
        id = Interactions.insert({ type: interactionType, guessingGame: { question, answer } });
        break;
      }

      case interactionTypes.GUESSING_VOTING: {
        id = Interactions.insert({ type: interactionType, guessingVoting: { question } });
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

    if (interactionType === interactionTypes.GUESSING_GAME) {
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
    } else if (interactionType === interactionTypes.GUESSING_VOTING) {
      check(question, String);
    }
  },
  run({ id, question, answer = null, votingId = null }) {
    const { type: interactionType } = Interactions.findOne(id);

    switch (interactionType) {
      case interactionTypes.GUESSING_GAME: {
        return Interactions.update(id, {
          $set: {
            'guessingGame.question': question,
            'guessingGame.answer': answer,
            'guessingGame.votingId': votingId,
          },
        });
      }

      case interactionTypes.GUESSING_VOTING: {
        return Interactions.update(id, { $set: { 'guessingVoting.question': question } });
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
