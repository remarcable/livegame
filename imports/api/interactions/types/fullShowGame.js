import SimpleSchema from 'simpl-schema';
import InteractionType from './InteractionType';

export const fullShowGame = new InteractionType({
  typeName: 'FULL_SHOW_GAME',
  label: 'Show • Spiel',
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
      defaultValue: 'NONE',
      allowedValues: ['NONE', 'CANDIDATE1', 'CANDIDATE2'],
      publish: true,
    },
  },
});

export const fullShowWaiting = new InteractionType({
  typeName: 'FULL_SHOW_WAITING',
  label: 'Show • Warten',
});

export const participationVoting = new InteractionType({
  typeName: 'PARTICIPATION_VOTING',
  label: 'Show • Zuschaueraktivierung',
  schemaKey: 'participationVoting',
  submittable: true,
  fields: {
    selectedParticipant: {
      type: String,
      label: 'Gewinner',
      optional: true,
      regEx: SimpleSchema.RegEx.Id,
      defaultValue: null,
      publish: true,
    },
    selectionState: {
      type: String,
      label: 'Auswahl-/Animationsstatus',
      defaultValue: 'WAITING',
      allowedValues: ['WAITING', 'ANIMATING', 'CONFIRMED'],
      publish: true,
    },
  },
});
