import SimpleSchema from 'simpl-schema';

const votingSchema = new SimpleSchema({
  question: {
    type: String,
    label: 'Frage',
  },
  state: {
    type: String,
    label: 'Status',
    allowedValues: ['active', 'closed'],
    optional: true,
  },
  yesVotes: {
    type: Number,
  },
  noVotes: {
    type: Number,
  },
});

export default votingSchema;
