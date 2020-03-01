import { interactionTypeNames } from './types';
import interactionsSchema from './schema';

const estimationGame = {
  question: 'question',
  votingId: 'fFrfaL4JDbnHRNc7H',
};

const estimationVoting = {
  question: 'question',
};

const fullShowGame = {
  gameNumber: 12,
  pointsCandidate1: 0,
  pointsCandidate2: 0,
  winner: null,
};

const showBreak = {
  template: 'NONE',
};

describe('interactionsSchema', () => {
  it('validates correct object', () => {
    const objects = [
      { type: interactionTypeNames.ESTIMATION_GAME, estimationGame },
      { type: interactionTypeNames.ESTIMATION_VOTING, estimationVoting },
      { type: interactionTypeNames.FULL_SHOW_GAME, fullShowGame },
      { type: interactionTypeNames.SHOW_BREAK, showBreak },
    ];

    expect(() => interactionsSchema.validate(objects)).not.toThrow();
  });

  it('only allows exactly one of estimationGame.answer and estimationGame.votingId', () => {
    const correctObject1 = {
      type: interactionTypeNames.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 100,
      },
    };

    const correctObject2 = {
      type: interactionTypeNames.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const correctObject3 = {
      type: interactionTypeNames.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 0,
      },
    };

    const wrongObject1 = {
      type: interactionTypeNames.ESTIMATION_GAME,
      estimationGame: {
        question: 'question',
        answer: 100,
        votingId: 'ABCABCABCABCABCAB',
      },
    };

    const wrongObject2 = {
      type: interactionTypeNames.ESTIMATION_GAME,
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
