import SimpleSchema from 'simpl-schema';

const candidatesSchema = new SimpleSchema({
  name: {
    type: String,
    index: 1,
  },
  imageUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  candidateNumber: {
    type: Number,
    optional: true,
    allowedValues: [1, 2],
    defaultValue: null,
  },
});

export default candidatesSchema;
