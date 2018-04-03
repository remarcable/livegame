/* globals describe, it, expect */
import SimpleSchema from 'simpl-schema';
import * as InteractionTypes from './interactionTypes';
import interactionsSchema from './schema';

const guessingGame = {
  question: 'question',
  answer: 5,
};

const guessingVoting = {
  question: 'question',
};

const fullShowVoting = {
  question: 'question',
  result: 'result',
};

const announcement = {
  template: 'template',
  title: 'title',
  body: 'body',
};

describe('interactionsSchema', () => {
  it('validates correct object', () => {
    const objects = [
      { type: InteractionTypes.GUESSING_GAME, guessingGame },
      { type: InteractionTypes.GUESSING_VOTING, guessingVoting },
      { type: InteractionTypes.FULL_SHOW_VOTING, fullShowVoting },
      { type: InteractionTypes.ANNOUNCEMENT, announcement },
    ];

    expect(() => interactionsSchema.validate(objects)).not.toThrow();
  });

  it('throws when more than one key is set', () => {
    const wrongObject1 = {
      type: InteractionTypes.GUESSING_GAME,
      guessingGame,
      guessingVoting,
    };

    const wrongObject2 = {
      type: InteractionTypes.GUESSING_VOTING,
      guessingGame,
      guessingVoting,
    };

    expect(() => interactionsSchema.validate(wrongObject1)).toThrow();
    expect(() => interactionsSchema.validate(wrongObject2)).toThrow();
  });

  it('only allows exactly one of guessingGame.answer and guessingGame.votingId', () => {
    const correctObject1 = {
      type: InteractionTypes.GUESSING_GAME,
      guessingGame: {
        question: 'question',
        answer: 100,
      },
    };

    const correctObject2 = {
      type: InteractionTypes.GUESSING_GAME,
      guessingGame: {
        question: 'question',
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const wrongObject1 = {
      type: InteractionTypes.GUESSING_GAME,
      guessingGame: {
        question: 'question',
        answer: 100,
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const wrongObject2 = {
      type: InteractionTypes.GUESSING_GAME,
      guessingGame: {
        question: 'question',
      },
    };

    expect(() => interactionsSchema.validate(correctObject1)).not.toThrow();
    expect(() => interactionsSchema.validate(correctObject2)).not.toThrow();

    expect(() => interactionsSchema.validate(wrongObject1)).toThrow();
    expect(() => interactionsSchema.validate(wrongObject2)).toThrow();
  });
});
