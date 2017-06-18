import { Meteor } from 'meteor/meteor';
import Submissions from '../collection';

Meteor.publish('submissions.own', function () {
  return Submissions.find({ userId: this.userId });
});
