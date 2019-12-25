import { Meteor } from 'meteor/meteor';
import SubmissionsCollection from '../collection';

// Only allow one submission per interaction per user. In the past not having this
// allowed users to submit more than once which broke the scoring algorithm
Meteor.startup(() => {
  // eslint-disable-next-line no-underscore-dangle
  SubmissionsCollection._ensureIndex({ interactionId: 1, userId: 1 }, { unique: 1 });
});
