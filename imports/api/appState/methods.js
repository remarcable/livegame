import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import AppState from './collection';

export const showScoresOnScoreboard = new ValidatedMethod({
  name: 'app.showScoresOnScoreboard',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, { $set: { scoreboard: 'scores' } });
  },
});

export const showVotingOnScoreboard = new ValidatedMethod({
  name: 'app.showVotingOnScoreboard',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, { $set: { scoreboard: 'voting' } });
  },
});

export const setHintText = new ValidatedMethod({
  name: 'app.setHintText',
  validate: new SimpleSchema({
    hintText: { type: String },
  }).validator(),
  run({ hintText }) {
    // TODO: Add proper authentication
    AppState.update({}, { $set: { hintText } });
  },
});

export const endLiveGame = new ValidatedMethod({
  name: 'app.endLiveGame',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, {
      $set: { gameEnded: true },
    });
  },
});

export const unendLiveGame = new ValidatedMethod({
  name: 'app.unendLiveGame',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, {
      $set: { gameEnded: false },
    });
  },
});
