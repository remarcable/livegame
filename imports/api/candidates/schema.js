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
  active: {
    type: Boolean,
    defaultValue: false,
  },
});

export default candidatesSchema;
