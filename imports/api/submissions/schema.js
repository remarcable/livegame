import SimpleSchema from 'simpl-schema';

const submissionSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
  },
  gameId: {
    type: SimpleSchema.RegEx.Id,
  },
  guess: {
    type: Number,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }

      this.unset(); // Prevent user from supplying their own value
    },
  },
});

export default submissionSchema;
