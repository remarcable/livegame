import { Meteor } from 'meteor/meteor';

import Games from '../collection';

Meteor.publish('games.active', function () {
  if (!this.userId) return this.ready();
  return Games.find({ state: 'active' }, {
    fields: {
      question: 1,
      state: 1,
    },
    limit: 1,
  });
});