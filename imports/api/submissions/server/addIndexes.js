import { Meteor } from 'meteor/meteor';
import SubmissionsCollection from '../collection';

Meteor.startup(() => {
  // eslint-disable-next-line no-underscore-dangle
  SubmissionsCollection._ensureIndex({ interactionId: 1, userId: 1 }, { unique: 1 });
});
