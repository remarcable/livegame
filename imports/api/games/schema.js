import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
  correctAnswer: {
    type: Number,
    label: 'Richtige Antwort',
    optional: true,
  },
});

export default gameSchema;
