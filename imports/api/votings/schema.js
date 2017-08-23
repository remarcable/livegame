import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
});

export default votingSchema;
