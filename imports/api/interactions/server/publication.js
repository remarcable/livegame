import { Meteor } from 'meteor/meteor';

import Interactions from '../collection';

Meteor.publish('interactions.active', function interactionsActivePublication() {
  if (!this.userId) return this.ready();
  return Interactions.find(
    { state: 'ACTIVE' }, // TODO use interactionStates
    {
      fields: {
        question: 1,
        state: 1,
        type: 1,
        'guessingGame.question': 1,
        'guessingVoting.question': 1,
        'fullShowVoting.question': 1,
        'announcement.template': 1,
        'announcement.title': 1,
        'announcement.body': 1,
      },
      limit: 1,
    },
  );
});

Meteor.publish('interactions.allInteractions', function interactionsAllPublication() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return Interactions.find();
});
