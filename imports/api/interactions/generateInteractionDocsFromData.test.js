import generateInteractionDocsFromData from './generateInteractionDocsFromData';

describe('generateInteractionDocsFromData', () => {
  it('returns the expected documents', () => {
    const fullShowGameData = {
      'game-1': 'Spiel 1',
      'game-2': 'Spiel 2',
      'game-3': 'Spiel 3',
      'game-4': 'Spiel 4',
      'game-5': 'Spiel 5',
      'game-6': 'Spiel 6',
      'game-7': 'Spiel 7',
      'game-8': 'Spiel 8',
      'game-9': 'Spiel 9',
      'game-10': 'Spiel 10',
      'game-11': 'Spiel 11',
      'game-12': 'Spiel 12',
      'game-13': 'Spiel 13',
      'game-14': 'Spiel 14',
      'game-15': 'Spiel 15',
    };

    const estimationGameData = {
      estimationGames: [{ question: 'Frage 1' }, { question: 'Frage 2', hasVoting: true }],
    };

    const expected = [
      {
        interactionType: 'SHOW_BREAK',
        title: 'Herzlich Willkommen!',
        data: { template: 'SHOWSTART' },
      },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 1', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 1',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 1', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 1', data: { gameNumber: 1 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 1', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 2', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 2',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 2', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 2', data: { gameNumber: 2 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 2', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 3', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 3',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 3', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 3', data: { gameNumber: 3 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 3', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 4', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 4',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 4', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 4', data: { gameNumber: 4 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 4', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 5', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 5',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 5', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 5', data: { gameNumber: 5 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 5', data: {} },

      { interactionType: 'ESTIMATION_WAITING', title: 'Schätzen', data: {} },

      {
        interactionType: 'ESTIMATION_GAME',
        title: 'Schätzen',
        data: { question: 'Frage 1', answer: 0 },
      },
      { interactionType: 'ESTIMATION_WAITING', title: 'Schätzen', data: {} },

      {
        interactionType: 'ESTIMATION_VOTING',
        title: 'Schätzen',
        data: { question: 'Frage 2' },
      },
      { interactionType: 'ESTIMATION_WAITING', title: 'Schätzen', data: {} },

      {
        interactionType: 'ESTIMATION_GAME',
        title: 'Schätzen',
        data: { question: 'Frage 2', answer: 0 },
      },
      { interactionType: 'ESTIMATION_WAITING', title: 'Schätzen', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Schätzen', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 6', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 6',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 6', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 6', data: { gameNumber: 6 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 6', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 7', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 7',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 7', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 7', data: { gameNumber: 7 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 7', data: {} },

      {
        interactionType: 'SHOW_BREAK',
        title: 'Pause',
        data: { template: 'MIDBREAK' },
      },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 8', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 8',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 8', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 8', data: { gameNumber: 8 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 8', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 9', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 9',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 9', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 9', data: { gameNumber: 9 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 9', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 10', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 10',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 10', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 10', data: { gameNumber: 10 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 10', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 11', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 11',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 11', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 11', data: { gameNumber: 11 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 11', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 12', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 12',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 12', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 12', data: { gameNumber: 12 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 12', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 13', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 13',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 13', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 13', data: { gameNumber: 13 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 13', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 14', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 14',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 14', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 14', data: { gameNumber: 14 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 14', data: {} },

      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 15', data: {} },
      {
        interactionType: 'PARTICIPATION_VOTING',
        title: 'Spiel 15',
        data: { selectionState: 'WAITING' },
      },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 15', data: {} },
      { interactionType: 'FULL_SHOW_GAME', title: 'Spiel 15', data: { gameNumber: 15 } },
      { interactionType: 'FULL_SHOW_WAITING', title: 'Spiel 15', data: {} },

      {
        interactionType: 'SHOW_BREAK',
        title: 'Auf Wiedersehen!',
        data: { template: 'SHOWEND' },
      },
    ];

    const result = generateInteractionDocsFromData(fullShowGameData, estimationGameData);
    expect(result).toEqual(expected);
  });
});
