import { Meteor } from 'meteor/meteor';
import Submissions from '../collection';

Meteor.publish('submissions.own', function() {
  if (!this.userId) return this.ready();
  return Submissions.find({ userId: this.userId });
});
