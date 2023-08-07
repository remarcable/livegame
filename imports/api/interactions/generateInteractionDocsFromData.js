const makeDoc = ({ interactionType, title, data = {} }) => ({
  interactionType,
  title,
  data,
});

const makeEstimationGameDoc = ({ question }) => {
  const data = { question, answer: 0 };
  return [
    makeDoc({ interactionType: 'ESTIMATION_GAME', title: 'Schätzen', data }),
    makeDoc({ interactionType: 'ESTIMATION_WAITING', title: 'Schätzen' }),
  ];
};

const makeEstimationGameWithVoting = ({ question }) => {
  const data = { question };
  return [
    makeDoc({ interactionType: 'ESTIMATION_VOTING', title: 'Schätzen', data }),
    makeDoc({ interactionType: 'ESTIMATION_WAITING', title: 'Schätzen' }),
    makeEstimationGameDoc({ question }),
  ];
};

const makeShowBreakDoc = ({ title, template }) => {
  const data = { template };
  return makeDoc({ interactionType: 'SHOW_BREAK', title, data });
};

const makeFullShowGame = ({ title, gameNumber }) => {
  const data = { gameNumber };
  return [
    makeDoc({ interactionType: 'FULL_SHOW_WAITING', title }),
    makeDoc({
      interactionType: 'PARTICIPATION_VOTING',
      title,
      data: { selectionState: 'WAITING' },
    }),
    makeDoc({ interactionType: 'FULL_SHOW_WAITING', title }),
    makeDoc({ interactionType: 'FULL_SHOW_GAME', title, data }),
    makeDoc({ interactionType: 'FULL_SHOW_WAITING', title }),
  ];
};

const makeEstimationGames = (estimationGameData) => {
  const { estimationGames } = estimationGameData;
  return estimationGames.map(({ question, hasVoting }) => {
    if (hasVoting) {
      return makeEstimationGameWithVoting({ question });
    }

    return makeEstimationGameDoc({ question });
  });
};

export default (fullShowGameData, estimationGameData) => {
  return [
    makeShowBreakDoc({ title: 'Herzlich Willkommen!', template: 'SHOWSTART' }),
    Object.values(fullShowGameData)
      .slice(0, 5)
      .map((val, i) => {
        const gameNumber = i + 1;
        return makeFullShowGame({ title: val, gameNumber });
      }),
    makeDoc({ interactionType: 'ESTIMATION_WAITING', title: 'Schätzen' }),
    makeEstimationGames(estimationGameData),
    makeDoc({ interactionType: 'FULL_SHOW_WAITING', title: 'Schätzen' }),
    Object.values(fullShowGameData)
      .slice(5, 7)
      .map((val, i) => {
        const gameNumber = i + 6;
        return makeFullShowGame({ title: val, gameNumber });
      }),
    makeShowBreakDoc({ title: 'Pause', template: 'MIDBREAK' }),
    Object.values(fullShowGameData)
      .slice(7, 15)
      .map((val, i) => {
        const gameNumber = i + 8;
        return makeFullShowGame({ title: val, gameNumber });
      }),
    makeShowBreakDoc({ title: 'Auf Wiedersehen!', template: 'SHOWEND' }),
  ].flat(3);
};
