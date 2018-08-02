import { typeNames } from './types';
import interactionsSchema from './schema';

const estimationGame = {
  question: 'question',
  votingId: 'fFrfaL4JDbnHRNc7H',
};

const estimationVoting = {
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
      { type: typeNames().ESTIMATION_GAME, estimationGame },
      { type: typeNames().ESTIMATION_VOTING, estimationVoting },
      { type: typeNames().FULL_SHOW_VOTING, fullShowVoting },
      { type: typeNames().ANNOUNCEMENT, announcement },
    ];

    expect(() => interactionsSchema.validate(objects)).not.toThrow();
  });

  it('only allows exactly one of estimationGame.answer and estimationGame.votingId', () => {
    const correctObject1 = {
      type: typeNames().ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 100,
      },
    };

    const correctObject2 = {
      type: typeNames().ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const correctObject3 = {
      type: typeNames().ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 0,
      },
    };

    const wrongObject1 = {
      type: typeNames().ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 100,
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const wrongObject2 = {
      type: typeNames().ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
      },
    };

    expect(() => interactionsSchema.validate(correctObject1)).not.toThrow();
    expect(() => interactionsSchema.validate(correctObject2)).not.toThrow();
    expect(() => interactionsSchema.validate(correctObject3)).not.toThrow();

    expect(() => interactionsSchema.validate(wrongObject1)).toThrow(
      'estimationGame.answer is not allowed by the schema',
    );
    expect(() => interactionsSchema.validate(wrongObject2)).toThrow('Antwort is required');
  });
});
