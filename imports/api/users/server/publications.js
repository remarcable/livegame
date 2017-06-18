import { Meteor } from 'meteor/meteor';

Meteor.publish('users.loggedIn', function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      firstName: 1,
      lastName: 1,
      alias: 1,
      rank: 1,
    },
  });
});
