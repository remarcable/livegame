import { Meteor } from 'meteor/meteor';

import Interactions from '../collection';
import interactionTypes from '../types';
import * as interactionStates from '../states';

Meteor.publish('interactions.active', function interactionsActivePublication() {
  if (!this.userId) return this.ready();

  // get all interactionTypes and its fields that should be published
  // and create an object from it for the mongo query
  const fieldsToPublish = [...interactionTypes.values()]
    .map((type) => type.getPublishFields())
    .reduce((arr, val) => [...arr, ...val], [])
    .reduce((obj, val) => ({ ...obj, [val]: 1 }), {});

  return Interactions.find(
    { state: interactionStates.ACTIVE },
    {
      fields: {
        state: 1,
        type: 1,

        ...fieldsToPublish,
      },
      limit: 1,
    },
  );
});

Meteor.publish('interactions.allInteractions', function interactionsAllPublication() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return Interactions.find();
});
