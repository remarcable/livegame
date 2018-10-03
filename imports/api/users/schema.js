import SimpleSchema from 'simpl-schema';

const userSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
  },
  newsletter: {
    type: Boolean,
  },
});

export default userSchema;
