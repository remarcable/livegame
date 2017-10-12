import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('users.loggedIn', function () {
  if (!this.userId) return this.ready();
  Counts.publish(this, 'users.loggedInCount', Meteor.users.find({ role: { $ne: 'admin' } }), { noReady: true });
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      firstName: 1,
      lastName: 1,
      alias: 1,
      email: 1,
      rank: 1,
      role: 1,
    },
  });
});

Meteor.publish('users.liveview.topTen', function () {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return Meteor.users.find({ role: { $ne: 'admin' }, rank: { $exists: true } }, {
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
