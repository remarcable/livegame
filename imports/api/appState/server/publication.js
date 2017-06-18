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
