import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Games from './collection';

export const startGame = new ValidatedMethod({
  name: 'games.startGame',
  validate: new SimpleSchema({
    gameId: { type: String },
  }).validator(),
  run({ gameId }) {
    // TODO: Add proper authentication
    Games.update({ state: 'active' }, {
      $set: { state: 'closed' },
    });

    Games.update(gameId, {
      $set: { state: 'active' },
    });
  },
});

export const stopGame = new ValidatedMethod({
  name: 'games.stopGame',
  validate: new SimpleSchema({
    gameId: { type: String },
  }).validator(),
  run({ gameId }) {
    // TODO: Add proper authentication
    Games.update(gameId, {
      $set: { state: 'closed' },
    });
  },
});
