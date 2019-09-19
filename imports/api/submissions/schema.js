import SimpleSchema from 'simpl-schema';

const submissionSchema = new SimpleSchema({
  interactionId: {
    type: SimpleSchema.RegEx.Id,
    index: 1,
  },
  userId: {
    type: SimpleSchema.RegEx.Id,
    index: 1,
  },
  value: {
    type: SimpleSchema.oneOf(Number, String), // TODO: see imports/api/submissions/methods.js for comment
    index: 1,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
      if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }

      this.unset(); // Prevent user from supplying their own value
    },
  },
});

export default submissionSchema;
