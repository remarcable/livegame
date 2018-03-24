import { Meteor } from 'meteor/meteor';
import VotingSubmissions from '../collection';

Meteor.publish('votingSubmissions.own', function() {
  if (!this.userId) return this.ready();
  return VotingSubmissions.find({ userId: this.userId });
});
