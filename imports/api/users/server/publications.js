import { Meteor } from 'meteor/meteor';
import { JoinServer } from 'meteor-publish-join';

import Interactions from '/imports/api/interactions/collection';
import getUserRankCounts from './getUserRankCounts';

Meteor.publish('users.loggedIn', function publishLoggedInUser() {
  if (!this.userId) return this.ready();
  return Meteor.users.find(
    { _id: this.userId },
    {
      fields: {
        firstName: 1,
        lastName: 1,
        alias: 1,
        email: 1,
        rank: 1,
        role: 1,
      },
    },
  );
});

Meteor.publish('users.count', function publishUserCount() {
  if (!this.userId) return this.ready();
  const UPDATE_INTERVAL = 5000;

  JoinServer.publish({
    context: this,
    name: 'userRankCounts',
    interval: UPDATE_INTERVAL,
    isShared: true,
    doJoin() {
      return getUserRankCounts(Interactions);
    },
  });

  JoinServer.publish({
    context: this,
    name: 'userCount',
    interval: UPDATE_INTERVAL,
    isShared: true,
    doJoin() {
      return Meteor.users.find({ role: { $ne: 'admin' } }).count();
    },
  });
});

Meteor.publish('users.liveview.topTen', function publishTopTenUsers() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return Meteor.users.find(
    { role: { $ne: 'admin' }, rank: { $exists: true } },
    {
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
    },
  );
});

Meteor.publish('users.all', function publishAllUsers() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return Meteor.users.find(
    { role: { $ne: 'admin' } },
    {
      fields: {
        firstName: 1,
        lastName: 1,
        alias: 1,
        rank: 1,
        points: 1,
        email: 1,
        role: 1,
      },
      sort: {
        rank: 1,
      },
    },
  );
});
