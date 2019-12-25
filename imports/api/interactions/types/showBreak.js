import InteractionType from './InteractionType';

const allowedValues = {
  NONE: 'Kein Template',
  SHOWSTART: 'Vor der Show',
  MIDBREAK: 'Pause',
  SHOWEND: 'Nach der Show',
};

export const showBreak = new InteractionType({
  typeName: 'SHOW_BREAK',
  label: 'Show • Pause',
  schemaKey: 'showBreak',
  fields: {
    template: {
      type: String,
      label: 'Template',
      defaultValue: 'NONE',
      allowedValues: Object.keys(allowedValues),
      uniforms: {
        transform: (key) => allowedValues[key],
      },
      publish: true,
    },
  },
});
