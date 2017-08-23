import { Meteor } from 'meteor/meteor';

import Votings from '../collection';

Meteor.publish('votings.active', function () {
  if (!this.userId) return this.ready();
  return Votings.find({ state: 'active' }, {
    fields: {
      question: 1,
      state: 1,
    },
    limit: 1,
  });
});

Meteor.publish('votings.allVotings', function () {
  if (!this.userId) return this.ready();
  return Votings.find();
});
