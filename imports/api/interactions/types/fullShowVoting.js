import InteractionType from './InteractionType';

export const fullShowVoting = new InteractionType({
  typeName: 'FULL_SHOW_VOTING',
  schemaKey: 'fullShowVoting',
  submittable: true,
  fields: {
    question: {
      type: String,
      label: 'Frage',
      publish: true,
    },
    result: {
      type: String,
      label: 'Ergebnis',
      optional: true,
      defaultValue: null,
      publish: true,
    },
  },
});

export const fullShowWaiting = new InteractionType({
  typeName: 'FULL_SHOW_WAITING',
});
