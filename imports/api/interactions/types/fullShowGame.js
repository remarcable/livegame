import InteractionType from './InteractionType';

export const fullShowGame = new InteractionType({
  typeName: 'FULL_SHOW_GAME',
  schemaKey: 'fullShowGame',
  submittable: true,
  fields: {
    gameNumber: {
      type: Number,
      label: 'Spielnummer',
      publish: true,
      index: 1,
    },
    pointsPaul: {
      type: Number,
      label: 'Punkte Paul',
      defaultValue: 0,
    },
    pointsCandidate: {
      type: Number,
      label: 'Punkte Kandidat',
      defaultValue: 0,
    },
    winner: {
      type: String,
      label: 'Gewinner',
      optional: true,
      defaultValue: null,
      publish: true,
    },
  },
});

export const fullShowWaiting = new InteractionType({
  typeName: 'FULL_SHOW_WAITING',
});
