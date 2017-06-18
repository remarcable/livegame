import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const appStateSchema = new SimpleSchema({
  gameEnded: {
    type: Boolean,
  },
  scoreboard: {
    type: String,
    allowedValues: ['scores', 'voting'],
  },
});

export default appStateSchema;
