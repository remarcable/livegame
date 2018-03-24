import SimpleSchema from 'simpl-schema';

const gameSchema = new SimpleSchema({
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
  answer: {
    type: Number,
    label: 'Richtige Antwort',
    optional: true,
  },
  votingId: {
    type: String,
    label: 'VotingId',
    optional: true,
  },
});

export default gameSchema;
