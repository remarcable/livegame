import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
  gamesOrder: {
    type: [String],
  },
});

export default appStateSchema;
