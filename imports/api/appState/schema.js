import SimpleSchema from 'simpl-schema';

import { rankDisplayModes } from './rank-display-modes';

const appStateSchema = new SimpleSchema({
  hintText: {
    type: String,
    optional: true,
  },
  votingToShow: {
    type: String,
    optional: true,
  },
  rankDisplayMode: {
    type: String,
    allowedValues: rankDisplayModes,
  },
  interactionsOrder: {
    type: Array,
  },
  'interactionsOrder.$': {
    type: String,
  },
});

export default appStateSchema;
