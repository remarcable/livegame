import interactionTypes from './types';
import interactionsSchema from './schema';

const estimationGame = {
  question: 'question',
  answer: 5,
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
      { type: interactionTypes.ESTIMATION_GAME, estimationGame },
      { type: interactionTypes.ESTIMATION_VOTING, estimationVoting },
      { type: interactionTypes.FULL_SHOW_VOTING, fullShowVoting },
      { type: interactionTypes.ANNOUNCEMENT, announcement },
    ];

    expect(() => interactionsSchema.validate(objects)).not.toThrow();
  });

  it('throws when more than one key is set', () => {
    const wrongObject1 = {
      type: interactionTypes.ESTIMATION_GAME,
      estimationGame,
      estimationVoting,
    };

    const wrongObject2 = {
      type: interactionTypes.ESTIMATION_VOTING,
      estimationGame,
      estimationVoting,
    };

    expect(() => interactionsSchema.validate(wrongObject1)).toThrow();
    expect(() => interactionsSchema.validate(wrongObject2)).toThrow();
  });

  it('only allows exactly one of estimationGame.answer and estimationGame.votingId', () => {
    const correctObject1 = {
      type: interactionTypes.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 100,
      },
    };

    const correctObject2 = {
      type: interactionTypes.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const correctObject3 = {
      type: interactionTypes.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 0,
      },
    };

    const wrongObject1 = {
      type: interactionTypes.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 100,
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const wrongObject2 = {
      type: interactionTypes.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
      },
    };

    expect(() => interactionsSchema.validate(correctObject1)).not.toThrow();
    expect(() => interactionsSchema.validate(correctObject2)).not.toThrow();
    expect(() => interactionsSchema.validate(correctObject3)).not.toThrow();

    expect(() => interactionsSchema.validate(wrongObject1)).toThrow();
    expect(() => interactionsSchema.validate(wrongObject2)).toThrow();
  });
});
