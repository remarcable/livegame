import { Meteor } from 'meteor/meteor';
import AppState from '../collection';

Meteor.publish('appState', function () {
  return AppState.find({}, {
    fields: {
      gameEnded: 1,
    },
    limit: 1,
  });
});
