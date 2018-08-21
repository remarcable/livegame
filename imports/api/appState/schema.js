import SimpleSchema from 'simpl-schema';

import { rankDisplayModes } from './rank-display-modes';

const appStateSchema = new SimpleSchema({
  hintText: {
    type: String,
    optional: true,
  },
  interactionToShow: {
    // interactionId is estimationGame: show estimation ranking
    // ~ is estimationVoting: show estimation voting result
    // ~ is showVoting: show full show voting result
    // ~ is null or other interaction type: show nothing
    type: String,
    optional: true,
  },
  rankDisplayMode: {
    type: String,
    allowedValues: rankDisplayModes,
  },
});

export default appStateSchema;
