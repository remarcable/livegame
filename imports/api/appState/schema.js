import SimpleSchema from 'simpl-schema';

import { rankDisplayModes } from './rank-display-modes';

const appStateSchema = new SimpleSchema({
  gameEnded: {
    type: Boolean,
  },
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
  gamesOrder: {
    type: Array,
  },
  'gamesOrder.$': {
    type: String,
  },
});

export default appStateSchema;
