import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import filterDOMProps from 'uniforms/filterDOMProps';

import interactionTypes from './types';
import * as interactionStates from './states';

// "index" is there to fix tests with jest,
// "publish" defines whether a field should be published to players
// "uniforms" is used for props by uniforms
SimpleSchema.extendOptions(['index', 'publish', 'uniforms']);

if (Meteor.isClient) {
  filterDOMProps.register('publish');
}

const baseSchema = {
  type: {
    type: String,
    allowedValues: Object.keys(interactionTypes),
    index: 1,
  },

  title: {
    type: String,
    optional: true,
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
