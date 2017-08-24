import { Meteor } from 'meteor/meteor';
import AppState from '../collection';

Meteor.publish('appState', function () {
  if (!this.userId) return this.ready();
  return AppState.find({}, {
    fields: {
      gameEnded: 1,
      hintText: 1,
    },
    limit: 1,
  });
});

Meteor.publish('appState.admin', function () {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return AppState.find({}, {
    fields: {
      gameEnded: 1,
      hintText: 1,
      liveview: 1,
      gamesOrder: 1,
    },
    limit: 1,
  });
});
