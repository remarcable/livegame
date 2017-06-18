import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const submissionSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
  },
  gameId: {
    type: SimpleSchema.RegEx.Id,
  },
  answer: {
    type: Number,
    decimal: true,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date };
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
  },
});

export default submissionSchema;
