import InteractionType from './InteractionType';

// eslint-disable-next-line import/prefer-default-export
export const announcement = new InteractionType({
  typeName: 'ANNOUNCEMENT',
  schemaKey: 'announcement',
  fields: {
    template: {
      type: String,
      label: 'Template',
    },
    title: {
      type: String,
      label: 'Titel',
    },
    body: {
      type: String,
      label: 'Body',
    },
  },
});
