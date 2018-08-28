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
    pointsCandidate1: {
      type: Number,
      label: 'Punkte Kandidat 1',
      optional: true,
      defaultValue: 0,
    },
    pointsCandidate2: {
      type: Number,
      label: 'Punkte Kandidat 2',
      optional: true,
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
