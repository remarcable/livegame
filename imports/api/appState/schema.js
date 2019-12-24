import SimpleSchema from 'simpl-schema';

import { rankDisplayModes } from './rank-display-modes';

const appStateSchema = new SimpleSchema({
  interactionToShow: {
    type: String,
    optional: true,
  },
  rankDisplayMode: {
    type: String,
    allowedValues: rankDisplayModes,
  },
});

export default appStateSchema;
