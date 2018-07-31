import SimpleSchema from 'simpl-schema';
import interactionTypes from './types';
import * as interactionStates from './states';

SimpleSchema.extendOptions(['index']); // fix tests, doesn't do anything in production

const baseSchema = {
  type: {
    type: String,
    allowedValues: Object.keys(interactionTypes),
    index: 1,
  },

  state: {
    type: String,
    allowedValues: Object.keys(interactionStates),
    defaultValue: null,
    optional: true,
    index: 1,
  },

  previous: {
    type: SimpleSchema.RegEx.Id,
    defaultValue: null,
    optional: 1,
    index: 1,
  },

  next: {
    type: SimpleSchema.RegEx.Id,
    defaultValue: null,
    optional: 1,
    index: 1,
  },
};

// convert (the MapIterable) interactionTypes.values() to an array
// and create schema object from base schema and all subschemas
const schema = [...interactionTypes.values()].reduce(
  (obj, interactionType) => ({ ...obj, ...interactionType.getSubSchema() }),
  {
    ...baseSchema,
  },
);

export default new SimpleSchema(schema);
