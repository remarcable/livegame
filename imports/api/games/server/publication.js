import { Meteor } from 'meteor/meteor';

Meteor.publish('games.active', function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find({ state: 'active' }, {
    fields: {
      question: 1,
      state: 1,
    },
  });
});
