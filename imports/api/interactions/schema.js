import SimpleSchema from 'simpl-schema';
import * as interactionTypes from './interactionTypes';
import * as interactionStates from './interactionStates';

import { fullShowVotingSubSchema } from './interactionTypes/fullShowVoting';
import { estimationGameSubSchema, estimationVotingSubSchema } from './interactionTypes/estimation';
import { announcementSubSchema } from './interactionTypes/announcement';

SimpleSchema.extendOptions(['index']); // fix tests, doesn't do anything in production

export const rawSchema = {
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

  ...fullShowVotingSubSchema,
  ...estimationGameSubSchema,
  ...estimationVotingSubSchema,
  ...announcementSubSchema,
};

export default new SimpleSchema(rawSchema);
