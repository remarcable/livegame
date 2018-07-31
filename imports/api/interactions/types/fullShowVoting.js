import InteractionType from './InteractionType';

export const fullShowVoting = new InteractionType({
  typeName: 'FULL_SHOW_VOTING',
  schemaKey: 'fullShowVoting',
  fields: {
    question: {
      type: String,
      label: 'Frage',
    },
    result: {
      type: String,
      label: 'Ergebnis',
      optional: true,
      defaultValue: null,
    },
  },
});

export const fullShowWaiting = new InteractionType({
  typeName: 'FULL_SHOW_WAITING',
});
