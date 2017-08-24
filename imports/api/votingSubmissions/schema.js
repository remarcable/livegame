import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const votingSubmissionSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
  },
  votingId: {
    type: SimpleSchema.RegEx.Id,
  },
  vote: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }

      this.unset();  // Prevent user from supplying their own value
    },
  },
});

export default votingSubmissionSchema;
