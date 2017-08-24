import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import VotingSubmissions from './collection';
import Votings from '../votings/collection';


export const submitVote = new ValidatedMethod({
  name: 'votingSubmissions.insert',
  validate: new SimpleSchema({
    vote: { type: String },
  }).validator(),
  run({ vote }) {
    if (!Meteor.userId()) throw new Error('not-authorized');
    if (this.isSimulation) return;

    const userId = Meteor.userId();
    const currentVoting = Votings.findOne({ state: 'active' });
    if (!currentVoting) throw new Meteor.Error('There is no voting active');
    const votingId = currentVoting._id;
    const hasAlreadyAnswered = VotingSubmissions.findOne({ userId, votingId });
    if (hasAlreadyAnswered) throw new Meteor.Error('User has already submitted for this voting');

    VotingSubmissions.insert({ userId, votingId, vote });
  },
});
