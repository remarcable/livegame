import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import Games from './collection';
import Votings from '../votings/collection';
import AppState from '../appState/collection';

export const startGame = new ValidatedMethod({
  name: 'games.startGame',
  validate: new SimpleSchema({
    gameId: { type: String },
  }).validator(),
  run({ gameId }) {
    Meteor.ensureUserIsAdmin(this.userId);

    Games.update({ state: 'active' }, { $set: { state: 'closed' } });
    Votings.update({ state: 'active' }, { $set: { state: 'closed' } });

    Games.update(gameId, { $set: { state: 'active' } });
  },
});

export const stopGame = new ValidatedMethod({
  name: 'games.stopGame',
  validate: new SimpleSchema({
    gameId: { type: String },
  }).validator(),
  run({ gameId }) {
    Meteor.ensureUserIsAdmin(this.userId);
    Games.update(gameId, { $set: { state: 'closed' } });
  },
});

export const createGame = new ValidatedMethod({
  name: 'games.create',
  validate: new SimpleSchema({
    question: { type: String },
    answer: { type: Number },
  }).validator(),
  run({ question, answer }) {
    Meteor.ensureUserIsAdmin(this.userId);
    const gameId = Games.insert({ question, answer });
    AppState.update({}, { $push: { gamesOrder: gameId } });

    return gameId;
  },
});

export const removeGame = new ValidatedMethod({
  name: 'games.remove',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    Meteor.ensureUserIsAdmin(this.userId);
    Games.remove({ _id: id });
    AppState.update({}, { $pull: { gamesOrder: id } });
  },
});

export const updateGame = new ValidatedMethod({
  name: 'games.update',
  validate: new SimpleSchema({
    id: { type: String },
    question: { type: String },
    answer: { type: Number, optional: true },
    votingId: { type: String, optional: true },
  }).validator(),
  run({ id, question, answer, votingId }) {
    Meteor.ensureUserIsAdmin(this.userId);
    // if answer === 0 check would be false
    if (answer !== undefined) return Games.update({ _id: id }, { $unset: { votingId: 1 }, $set: { question, answer } });
    if (votingId) return Games.update({ _id: id }, { $unset: { answer: 1 }, $set: { question, votingId } });
  },
});

export const updateGamesOrder = new ValidatedMethod({
  name: 'games.updateOrder',
  validate: new SimpleSchema({
    newOrder: { type: Array },
    'newOrder.$': { type: String },
  }).validator(),
  run({ newOrder }) {
    Meteor.ensureUserIsAdmin(this.userId);
    return AppState.update({}, { $set: { gamesOrder: newOrder } });
  },
});
