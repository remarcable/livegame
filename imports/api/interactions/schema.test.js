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
});
