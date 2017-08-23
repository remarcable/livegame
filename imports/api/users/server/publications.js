import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('users.loggedIn', function () {
  Counts.publish(this, 'users.loggedInCount', Meteor.users.find({ role: { $ne: 'admin' } }), { noReady: true });
  if (!this.userId) return this.ready();
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      firstName: 1,
      lastName: 1,
      alias: 1,
      rank: 1,
      role: 1,
    },
  });
});

Meteor.publish('users.scoreboard.topTen', function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find({ role: { $ne: 'admin' } }, {
    fields: {
      firstName: 1,
      lastName: 1,
      alias: 1,
      rank: 1,
    },
    sort: {
      rank: 1,
    },
    limit: 10,
  });
});
