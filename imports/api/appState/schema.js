import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const appStateSchema = new SimpleSchema({
  gameEnded: {
    type: Boolean,
  },
  hintText: {
    type: String,
    optional: true,
  },
  liveview: {
    type: String,
    allowedValues: ['scores', 'voting'],
  },
  gamesOrder: {
    type: [String],
  },
});

export default appStateSchema;
